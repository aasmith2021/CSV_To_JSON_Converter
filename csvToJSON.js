const convertStringToBooleanOrNull = (textString) => {
  switch (textString.trim().toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'null':
      return null;
    default:
      return textString;
  }
};

const splitCSVLineToArray = (dataRow, convertBooleanAndNullStrings) => {
    const resultArray = [];

    while (dataRow.length) {
        if (dataRow.indexOf('"') === 0) {
            const indexOfClosingQuotationMark = dataRow.substring(1).indexOf('"') + 1;
            const text = dataRow.substring(1, indexOfClosingQuotationMark);
            const result = convertBooleanAndNullStrings ? convertStringToBooleanOrNull(text) : text;
            resultArray.push(result);
            dataRow = dataRow.substring(indexOfClosingQuotationMark + 2);
        } else if (dataRow.indexOf(',') !== -1) {
            const text = dataRow.substring(0, dataRow.indexOf(','));
            const result = convertBooleanAndNullStrings ? convertStringToBooleanOrNull(text) : text;
            resultArray.push(result);
            dataRow = dataRow.substring(dataRow.indexOf(',') + 1);
        } else if (dataRow.indexOf(',') === -1 && dataRow.length !== 0) {
            const result = convertBooleanAndNullStrings ? convertStringToBooleanOrNull(dataRow) : dataRow;
            resultArray.push(result);
            dataRow = '';
        }
    }

    return resultArray;
}

/**
 * Converts raw CSV data into an array of JSON objects. Each object created sets its property keys
 * from the first row of CSV data, and each property value is set corresponding row data.
 * @param {String} rawCSVData - A single string with the CSV data
 * @param {Boolean} convertBooleanAndNullStrings - A flag indicating if 'true', 'false', and 'null'
 * strings should be converted to boolean and null values
 * @returns {[Object]} - An array of data objects populated with the key-value pairs
 * of the header data and the corresponding row data.
 */
const csvToJSON = (rawCSVData, convertBooleanAndNullStrings = false) => {
    const lineBreakCharacter = rawCSVData.includes('\r\n') ? '\r\n' : '\n';

    [headerRow, ...dataRows] = rawCSVData.split(lineBreakCharacter);
    const headers = splitCSVLineToArray(headerRow);

    const allDataAsJSON = dataRows.map((dataRow) => {
        const dataRowSplitToArray = splitCSVLineToArray(dataRow, convertBooleanAndNullStrings);
        const dataObject = {};

        indexOfDataToAdd = 0;
        for (const header of headers) {
            dataObject[header] = dataRowSplitToArray[indexOfDataToAdd];
            indexOfDataToAdd++;
        }

        return dataObject;
    });

    return allDataAsJSON;
}

module.exports = {
    csvToJSON,
}
