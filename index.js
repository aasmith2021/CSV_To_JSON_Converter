const fs = require('fs');
const { csvToJSON } = require('./csvToJSON.js');

module.exports = (csvFilePath, newJSONFilePath, convertBooleanAndNullStrings = false) => {
  const csvData = fs.readFileSync(csvFilePath, { encoding: 'utf8' });
  const JSONData = csvToJSON(csvData, convertBooleanAndNullStrings);

  fs.writeFile(newJSONFilePath, JSON.stringify(JSONData), (err) => {
      if (err) {
          console.log(err);
      } else {
          console.log('CSV to JSON Conversion complete!');
      }
  });
};

