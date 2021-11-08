const fs = require('fs');
const path = require('path');
const { csvToJSON } = require('./csvToJSON.js');

const filePathOfCSVFile = path.resolve(__dirname, './test.csv');
const filePathOfNewJSONFile = path.resolve(__dirname, './test.json');

const startTime = performance.now();
const csvData = fs.readFileSync(filePathOfCSVFile, { encoding: 'utf8' });

const JSONData = csvToJSON(csvData);

fs.writeFile(filePathOfNewJSONFile, JSON.stringify(JSONData), (err) => {
    if (err) {
        console.log(err);
    } else {
        const endTime = performance.now();
        console.log('CSV to JSON Conversion complete!');
        console.log('Conversion completed in:', endTime - startTime,'ms');
    }
});
