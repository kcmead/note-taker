const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Write content to a file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Append new data to the file
const readAndAppend = (content, file) => {    
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Parse existing data from the file
      const parsedData = JSON.parse(data);
      
      // Push new content to the parsed data
      parsedData.push(content);

      // Write the updated data back to the file
      writeToFile(file, parsedData);
    }
  });
};

// Delete selected data from the file
const readAndDelete = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Parse existing data from the file
      const parsedData = JSON.parse(data);

      // Filter out the data with the specified 'id'
      const filteredData = parsedData.filter((data) => data.id !== id);

      // Write the updated data back to the file
      writeToFile(file, filteredData);
    }
  });
};

// Exporting the utility functions for use in other files
module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
