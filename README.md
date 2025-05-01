# 💼 JobApplicationTrackerExtension

A lightweight **Chrome Extension** to help you **track job applications** directly from job posting pages.

After applying to a job, simply click on the extension — it will automatically extract the company name and position from the page. You can make any edits before clicking **Submit**, and the job information will be logged directly to your Google Sheet.

<p align="center">
  <img src="https://github.com/user-attachments/assets/f0592acd-81ac-4967-80c9-057830fac31d" width="600"/>
</p>

---

## ✨ Features

- ✅ Auto-fill company name and job title from the job page  
- ✅ Edit fields before submission  
- ✅ Submit job info (date, company, title, link) to your personal Google Sheet  
- ✅ Quick one-click tracking from your browser  

---

## 📝 How to Set Up

### 1. Set Up Your Google Sheet

#### 🔧 Step 1: Create Google Apps Script

1. Create a new Google Sheet.  
2. Go to `Extensions > Apps Script`.

<p align="center">
  <img src="https://github.com/user-attachments/assets/89118e95-dec1-46fc-afea-82117684a194" width="500"/>
</p>

#### 🔧 Step 2: Add Script

1. Copy and paste the code from `google_sheet.js` into the script editor.  
2. Click **Deploy > Manage Deployments**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/90e68e92-f851-42ec-824c-738c76d6e772" width="600"/>
</p>

#### 🔧 Step 3: Set Permissions and Copy Web App URL

1. Click **Deploy**, set access to **Anyone**, and copy the **Web App URL**.  
2. Paste it into your local `config.json` file:

```json
{
  "webAppUrl": "https://script.google.com/macros/s/XXXXXX/exec"
}
```


### 2. Set Up Your Google Extension

#### 🧩 Step 1: Clone or Download the Repository

Clone the Project using Git

```bash
git clone https://github.com/fuling0727/JobApplicationTrackerExtension.git
```

#### 🧩 Step 2: Load the Extension in Chrome

1. Open Chrome and go to chrome://extensions

2. Enable Developer Mode in the top right

3. Click Load unpacked

4. Select the extracted JobApplicationTrackerExtension folder

#### ✅ Step 3: Test the Extension

Open any job posting page (e.g. LinkedIn, Greenhouse, Google Careers)

1. Click the extension icon in the toolbar

2. The Company and Position fields will auto-fill (you can edit them)

3. Click Submit
→ The job data (timestamp, company, position, URL) will be logged to your Google Sheet
