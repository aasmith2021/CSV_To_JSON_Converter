const fs = require('fs');
const path = require('path');
const { csvToJSON } = require('./csvToJSON.js');

// EDIT THESE FILE PATHS:
const filePathOfCSVFile = path.resolve(__dirname, './test.csv');
const filePathOfNewJSONFile = path.resolve(__dirname, './test.json');

const csvData = fs.readFileSync(filePathOfCSVFile, { encoding: 'utf8' });
const JSONData = csvToJSON(csvData, true);

fs.writeFile(filePathOfNewJSONFile, JSON.stringify(JSONData), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('CSV to JSON Conversion complete!');
    }
});
