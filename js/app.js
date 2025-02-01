// This file contains the JavaScript code for the web application.
// It handles interactive functionality, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('processButton');
    if (button) {
        button.addEventListener('click', processButtonClick);
    }

    function processButtonClick() {
        const rawData = document.getElementById('rawData').value;
        document.getElementById('rawString').value = rawData;

        // Example regex to extract key-value pairs (adjust as needed)
        const regex = /(\w+):\s*(\w+)/g;
        let match;
        const result = {};

        while ((match = regex.exec(rawData)) !== null) {
            result[match[1]] = match[2];
        }

        document.getElementById('jsonOutput').value = JSON.stringify(result, null, 2);
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
        const jsonOutput = document.getElementById('jsonOutput').value;
        const data = JSON.parse(jsonOutput);
        const tbody = document.getElementById('dataTable').querySelector('tbody');
        tbody.innerHTML = '';

        for (const key in data) {
            const row = document.createElement('tr');
            const keyCell = document.createElement('td');
            const valueCell = document.createElement('td');
            keyCell.textContent = key;
            valueCell.textContent = data[key];
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            tbody.appendChild(row);
        }
    }

    window.pushToTable = pushToTable;
});