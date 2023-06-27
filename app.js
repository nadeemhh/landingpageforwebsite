const express = require('express')
const path = require('path')
const  fs = require('fs');
const app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
const publicDirectoryPath = path.join(__dirname, './client')
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3600



 app.post('/visticount', (req, res) => {
    console.log(req.body)

  fs.readFile('user-footprint.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    const jsonData = JSON.parse(data);
  
    // Update the visiter_count
    jsonData.visiter_count += req.body.visti_count;
  
    // Convert the object back to JSON string
    const updatedData = JSON.stringify(jsonData, null, 2);
  
    // Write the updated JSON string back to the file
    fs.writeFile('user-footprint.json', updatedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
  
      console.log('visiter_count updated successfully');
      res.send('done')
    });
  });
   });



   app.post('/languageConversionCount', (req, res) => {
    console.log(req.body)

  fs.readFile('language-conversion-count.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    const jsonData = JSON.parse(data);
  
    // Update the visiter_count
    jsonData.language_conversion_count += req.body.languageConversionCount;
  
    // Convert the object back to JSON string
    const updatedData = JSON.stringify(jsonData, null, 2);
  
    // Write the updated JSON string back to the file
    fs.writeFile('language-conversion-count.json', updatedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
  
      console.log('language-Conversion-Count updated successfully');
      res.send('done')
    });
  });
   });



   app.get('/getcount', (req, res) => {

    let obj={language_conversion_count: 0,visiter_count: 0}

 fs.readFile('user-footprint.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    const jsonData = JSON.parse(data);
  obj.visiter_count=jsonData.visiter_count

  fs.readFile('language-conversion-count.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    const jsonData = JSON.parse(data);
    obj.language_conversion_count=jsonData.language_conversion_count
    res.send(JSON.stringify(obj))
  });


  });

  
   })


   app.get('/zero', (req, res) => {

  

 fs.readFile('user-footprint.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    let jsonData = JSON.parse(data);
jsonData.visiter_count=0;

  // Convert the object back to JSON string
  let updatedData = JSON.stringify(jsonData, null, 2);
  
  // Write the updated JSON string back to the file
  fs.writeFile('user-footprint.json', updatedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('visiter_count updated successfully');
   
  });


  fs.readFile('language-conversion-count.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Parse the JSON data into an object
    let jsonData = JSON.parse(data);
jsonData.language_conversion_count=0;

// Convert the object back to JSON string
let updatedData = JSON.stringify(jsonData, null, 2);
  
// Write the updated JSON string back to the file
fs.writeFile('language-conversion-count.json', updatedData, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('language-Conversion-Count updated successfully');
  res.send('done')
});

  });


  });

  
   })
app.listen(port)

