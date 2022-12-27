// new operator - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({path:`${__dirname}/../.env`})

const URI = process.env.ATLAS_URI

// Test MongoDB connectivity
// Create a new MongoClient
const client = new MongoClient(URI);

async function mongoCheck() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//mongoCheck().catch(console.dir);

//InsertOne
async function mongoInsertOne(phone,data) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      const database = client.db("demo_logs");

      console.log("Connected successfully to server");

      const dbCollection = database.collection("Collection")
      const doc = {
        phone:phone,
        data:data
      }
      // Insert data
      const result = await dbCollection.insertOne(doc)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  //mongoInsertOne(61406423558,'Sample Data').catch(console.dir);
  
//SearchOne
async function mongoFindOne(arg_userId) {
  const userIdInteger = parseInt(arg_userId)
  //console.log(userIdInteger.userId)
  try {
    const database = client.db("demo-users");
    const collection = database.collection("telegram-users-collection");
    const query = {userId : userIdInteger};

    const searchResult = await collection.findOne(query);
    //console.log(JSON.stringify(searchResult))
    return JSON.stringify(searchResult)

  } catch (error) {
    console.log(error)
  } finally {
    await client.close();
  }
}


module.exports = {
    mongoCheck,
    mongoInsertOne,
    mongoFindOne
}