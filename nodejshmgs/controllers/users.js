 const { MongoClient } = require('mongodb');
//const uploads = require('../uploads');
const fs = require("fs");
const { v4 } = require('uuid');

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';
var client = new MongoClient(url);
const dbName = 'jghdb';


 const getAll = async (req, res) => {
    const collName = req.params.collName;
      // Use connect method to connect to the server
      
   await client.connect();
          
   const db = client.db(dbName);
   const collection = db.collection(collName);
   try {
       var findResult = await collection.find({}).toArray();
       console.log('Found documents =>', findResult);
   
   }catch (error) {
       if (error instanceof MongoServerError) {
         console.log(`Error worth logging: ${error}`); // special case for some reason
       }
       throw error; // still want to crash
     }
   

    res.send(findResult);
};
 const getOne = async (req, res) => {
    var collName = req.params.collName;
    var id = req.params.id;
   // Use connect method to connect to the server
   await client.connect(); 
   const db = client.db(dbName);
   const collection = db.collection(collName);
   try {
    var filteredDocs = await collection.find({ _id: id }).toArray();
console.log(`Found documents filtered by { Id: ${id} } =>`, filteredDocs);
   }catch (error) {
       if (error instanceof MongoServerError) {
         console.log(`Error worth logging: ${error}`); // special case for some reason
       }
       throw error; // still want to crash
     }
       res.send(filteredDocs);
};
 const getSome = async (req, res) => {
    const collName = req.params.collName;
    const value = req.query.value;
    const searchwith = req.query.searchwith;

    // Use connect method to connect to the server
    
 await client.connect();
        
 const db = client.db(dbName);
 const collection = db.collection(collName);
 try {
     var findResult = await collection.find({[searchwith]: {$regex:`^${value}`, $options:`si`}}).toArray();
     console.log('Found documents =>', findResult);
 
 }catch (error) {
     if (error instanceof MongoServerError) {
       console.log(`Error worth logging: ${error}`); // special case for some reason
     }
     throw error; // still want to crash
   }
 

  res.send(findResult);
};
 const insertData = async (req, res) => {
const collName = req.params.collName;
const date = new Date();
const mi = date.getMinutes();
const hr = date.getHours();
const day = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();
var data = req.body;
console.log(data);
var datas = {...data, _id: v4()};
 // Use connect method to connect to the server
      
 await client.connect();
          
 const db = client.db(dbName);
 const collection = db.collection(collName);
 try {
  var insertResult = await collection.insertOne(datas);
  console.log('Inserted documents =>', insertResult);
 res.send(insertResult);

 }catch (error) {
     if (error instanceof MongoServerError) {
       console.log(`Error worth logging: ${error}`); // special case for some reason
     }
     throw error; // still want to crash
   }
};
 const putData = async (req, res) => {
    const collName = req.params.collName;
    const id = req.params.id;
    var data = req.body;
    // Use connect method to connect to the server
      
 await client.connect();
          
 const db = client.db(dbName);
 const collection = db.collection(collName);
 try {
  
  var updateResult = await collection.updateOne({ _id: id }, { $set: data });
  console.log('Updated documents =>', updateResult);
     res.send(updateResult);

 }catch (error) {
     if (error instanceof MongoServerError) {
       console.log(`Error worth logging: ${error}`); // special case for some reason
     }
     throw error; // still want to crash
   }
};
 const deleteData = async (req, res) => {
        const collName = req.params.collName;
        const id = req.params.id;
       // Use connect method to connect to the server
      
 await client.connect();
          
 const db = client.db(dbName);
 const collection = db.collection(collName);
 try {
  var deleteResult = await collection.deleteMany({ _id: id });
  console.log('Deleted documents =>', deleteResult);
         res.send(deleteResult); 

}catch (error) {
     if (error instanceof MongoServerError) {
       console.log(`Error worth logging: ${error}`); // special case for some reason
     }
     throw error; // still want to crash
   }
};
const uploadFile = async (req, res) => {
  var { name } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (const video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }
  try {
    const createdMedia = {
      name,
      videos: videosPaths
    }
    await client.connect();         
const db = client.db(dbName);
const collection = db.collection("Media");
var insertResult = await collection.insertOne(createdMedia);
res.send({ message: 'Media created successfully', createdMedia })
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  };



};

module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.getSome = getSome;
module.exports.insertData = insertData;
module.exports.putData = putData;
module.exports.deleteData = deleteData;
module.exports.uploadFile = uploadFile;