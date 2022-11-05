const fs = require('fs');
const path = require('path');
const { csvToJSON } = require('./csvToJSON.js');

module.exports = (csvFilePath = './test.csv', newJSONFilePath = './test.json', convertBooleanAndNullStrings = false) => {
  const filePathOfCSVFile = path.resolve(__dirname, csvFilePath);
  const filePathOfNewJSONFile = path.resolve(__dirname, newJSONFilePath);

  const csvData = fs.readFileSync(filePathOfCSVFile, { encoding: 'utf8' });
  const JSONData = csvToJSON(csvData, convertBooleanAndNullStrings);

  fs.writeFile(filePathOfNewJSONFile, JSON.stringify(JSONData), (err) => {
      if (err) {
          console.log(err);
      } else {
          console.log('CSV to JSON Conversion complete!');
      }
  });
};

