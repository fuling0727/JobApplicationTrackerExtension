function doPost(e) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = JSON.parse(e.postData.contents);
      
      // Log incoming data
      Logger.log("Received data: " + JSON.stringify(data));
      
      // Append row
      sheet.appendRow([
        new Date(), 
        data.title || '', 
        data.url || '', 
        data.company || '', 
        data.position || ''
      ]);
      
      return ContentService.createTextOutput("Success");
    } catch (err) {
      Logger.log("ERROR: " + err.message);
      return ContentService.createTextOutput("Failure");
    }
  }
  