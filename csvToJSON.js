const splitCSVLineToArray = (dataRow) => {
    const resultArray = [];

    while (dataRow.length) {
        if (dataRow.indexOf('"') === 0) {
            const indexOfClosingQuotationMark = dataRow.substring(1).indexOf('"') + 1;
            resultArray.push(dataRow.substring(1, indexOfClosingQuotationMark));
            dataRow = dataRow.substring(indexOfClosingQuotationMark + 2);
        } else if (dataRow.indexOf(',') !== -1) {
            resultArray.push(dataRow.substring(0, dataRow.indexOf(',')));
            dataRow = dataRow.substring(dataRow.indexOf(',') + 1);
        } else if (dataRow.indexOf(',') === -1 && dataRow.length !== 0) {
            resultArray.push(dataRow);
            dataRow = '';
        }
    }

    return resultArray;
}

/**
 * Converts raw CSV data into an array of JSON objects. Each object created sets its property keys
 * from the first row of CSV data, and each property value is set corresponding row data.
 * @param {String} rawCSVData - A single string with the CSV data
 * @returns {[Object]} - An array of data objects populated with the key-value pairs
 * of the header data and the corresponding row data.
 */
const csvToJSON = (rawCSVData) => {
    const lineBreakCharacter = rawCSVData.includes('\r\n') ? '\r\n' : '\n';

    [headerRow, ...dataRows] = rawCSVData.split(lineBreakCharacter);
    const headers = splitCSVLineToArray(headerRow);

    const allDataAsJSON = dataRows.map((dataRow) => {
        const dataRowSplitToArray = splitCSVLineToArray(dataRow);
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
