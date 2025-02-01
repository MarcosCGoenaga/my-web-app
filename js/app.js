// This file contains the JavaScript code for the web application.
// It handles interactive functionality, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('processButton');
    if (button) {
        button.addEventListener('click', processButtonClick);
    }

    function processButtonClick() {
        const rawData = document.getElementById('rawData').value;
        const cleanedData = cleanRawData(rawData);
        const filteredData = extractInventoryData(cleanedData);
        const jsonString = JSON.stringify(filteredData, null, 2);
        document.getElementById('filteredData').value = jsonString;
        document.getElementById('jsonString').value = jsonString;
    }

    function cleanRawData(text) {
        // Remove unwanted characters and extra spaces
        return text.replace(/[^\x20-\x7E]+/g, '').replace(/\s+/g, ' ').trim();
    }

    function extractInventoryData(text) {
        const patterns = {
            'Item #': /Item #\. : (\d+)/,
            'Order Date': /Order Date\. . . . . . : (\d{2}\/\d{2}\/\d{2})/,
            'Expected Arrival Date': /Expected Arrival Date \. : (\d{2}\/\d{2}\/\d{2})/,
            'Need Quantity': /Need Quantity\. . . . : (\d+)/,
            'Max Order Quantity': /Max Order Quantity\. . . : (\d+)/,
        };

        const parsedData = {};
        for (const [key, pattern] of Object.entries(patterns)) {
            const match = text.match(pattern);
            if (match) {
                parsedData[key] = match[1];
            }
        }
        return parsedData;
    }

    function pushToTable() {
        const jsonString = document.getElementById('jsonString').value;
        const data = JSON.parse(jsonString);
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';

        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement('tr');
            const keyCell = document.createElement('td');
            const valueCell = document.createElement('td');
            keyCell.textContent = key;
            valueCell.textContent = value;
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            tableBody.appendChild(row);
        }
    }

    window.pushToTable = pushToTable;
});