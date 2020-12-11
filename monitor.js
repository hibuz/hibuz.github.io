const request = require('request');
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

function sendMessage(message) {

  const options = {
    uri: 'https://hooks.slack.com/services/' + process.env.SLACK_TOKEN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      text: message
    },
    json:true
  }

  request(options, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

const parser = new PublicGoogleSheetsParser(process.env.GOOGLE_SHEET_ID);

parser.parse()
  .then((res) => {
    if (res.find(item => item.id === 1)) {
      console.log('OK')
    } else {
      sendMessage('check google sheets!');
    }
   })
  .catch((err) => {
    console.log(err)
    sendMessage(err)
  });
