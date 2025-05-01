async function extractJobInfo(tabId) {
    return await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        let company = '';
        let position = '';
  
        const titleMatch = document.title.match(/^(.*?)(?:\s*[-|@]|\s+at\s+)(.*)$/i);
        if (titleMatch) {
          position = titleMatch[1].trim();
          const potentialCompany = titleMatch[2].trim();
          if (potentialCompany && potentialCompany.length > 1) {
            company = potentialCompany;
          }
        } else {
          position = document.title.trim();
        }
  
        if (!position || position.length < 2) {
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle && ogTitle.content) position = ogTitle.content;
        }
  
        const metaCompany = document.querySelector('meta[name="company"], meta[property="og:site_name"]');
        if (metaCompany && metaCompany.content) {
          company = metaCompany.content;
        } else {
          const jsonLd = document.querySelector('script[type="application/ld+json"]');
          if (jsonLd) {
            try {
              const json = JSON.parse(jsonLd.innerText);
              if (json.hiringOrganization && json.hiringOrganization.name) {
                company = json.hiringOrganization.name;
              } else if (json.name && json.description && json.description.includes(json.name)) {
                company = json.name;
              }
            } catch (e) {}
          }
  
          if (!company || company.length < 2) {
            const companyTag = document.querySelector('[class*="company"], [id*="company"], .job-company, .posting-company');
            if (companyTag && companyTag.innerText) company = companyTag.innerText.trim();
          }
        }
  
        if (!company || company.length < 2) {
          const hostname = window.location.hostname;
          const pathname = window.location.pathname;
          const match = pathname.match(/\/jobs\/([^\/\?]+)/);
          const subdomain = hostname.split('.')[0];
  
          if (hostname.includes('greenhouse.io')) {
            const pathParts = pathname.split('/');
            if (pathParts.length > 1 && pathParts[1]) {
              company = pathParts[1];
            } else if (subdomain && subdomain !== 'www' && subdomain !== 'job-boards') {
              company = subdomain;
            }
          }
        }
  
        return { company, position };
      }
    }).then(results => results[0].result);
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const extracted = await extractJobInfo(tab.id);
  
    const companyInput = document.getElementById('company');
    const positionInput = document.getElementById('position');
  
    if (extracted.company) companyInput.value = extracted.company;
    if (extracted.position) positionInput.value = extracted.position;
  });

  document.getElementById('submit').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url || '';
    const title = tab.title || '';
    const timestamp = new Date().toISOString();
  
    const company = document.getElementById('company').value.trim();
    const position = document.getElementById('position').value.trim();
  
    if (!company || !position) {
      document.getElementById('status').textContent = 'Please fill in all fields.';
      return;
    }
  
    const data = { timestamp, url, title, company, position };
  
    // ✅ Minimal fix: Load config.json, then do POST
    fetch(chrome.runtime.getURL('config.json'))
      .then(response => response.json())
      .then(config => {
        return fetch(config.webAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      })
      .then(() => {
        document.getElementById('status').textContent = 'Logged successfully!';
        document.getElementById('company').value = '';
        document.getElementById('position').value = '';
      })
      .catch(() => {
        document.getElementById('status').textContent = 'Failed to connect.';
      });
  });  