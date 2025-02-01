// This file contains the JavaScript code for the web application.
// It handles interactive functionality, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('processButton');
    if (button) {
        button.addEventListener('click', function() {
            const rawData = document.getElementById('rawData').value;
            
            // Process the data using the regex pattern
            const filteredData = extractInventoryData(rawData);
            
            const jsonString = JSON.stringify(filteredData, null, 2);
            document.getElementById('filteredData').value = jsonString;
            document.getElementById('jsonString').value = jsonString;
        });
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
});