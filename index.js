const fs = require('fs/promises');
const { csvToJSON } = require('./csvToJSON.js');

module.exports = async (csvFilePath = './test.csv', newJSONFilePath = './test.json', convertBooleanAndNullStrings = false) => {
  try {  
    const csvData = await fs.readFile(csvFilePath, { encoding: 'utf8' });
    const JSONData = csvToJSON(csvData, convertBooleanAndNullStrings);
    await fs.writeFile(newJSONFilePath, JSON.stringify(JSONData));
    console.log('CSV to JSON Conversion complete!');
  } catch (err) {
      console.log(err);
  }
};
