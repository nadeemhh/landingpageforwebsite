const express = require('express')
const path = require('path')
const  fs = require('fs');
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
const publicDirectoryPath = path.join(__dirname, './client')
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3600


mongoose.connect('mongodb+srv://virtual-trading:hkiyygh68tfgcfhs586@cluster0.ohx5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


const CountSchema = new mongoose.Schema({
  language_conversion_count: {
    type: Number
  },
  visiter_count: {
    type: Number
  }
});

const Count = mongoose.model('Count', CountSchema);



 app.post('/visticount', (req, res) => {
  
async function update() {
  const count = await Count.findOne();

count.visiter_count += req.body.visti_count;
await count.save();

res.send('done')
}
update()

   });



   app.post('/languageConversionCount', (req, res) => {

async function update() {
  const count = await Count.findOne();
count.language_conversion_count += req.body.languageConversionCount;
await count.save();

res.send('done')
}
update()

   });



   app.get('/getcount', (req, res) => {

 
async function getc() {
  const count = await Count.findOne();
res.send(JSON.stringify(count))
}
getc()
 
   })


   app.get('/zero', (req, res) => {

async function zero() {
const count = await Count.findOne();
count.visiter_count = 0;
count.language_conversion_count = 0;
await count.save();
}
zero()
  res.send('done')

  
   })
app.listen(port)

