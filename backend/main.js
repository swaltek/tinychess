const express = require('express');
const cors = require('cors');
const mongo = require('mongodb').MongoClient;
const app = express();
app.use(cors());

const mongoUrl = "mongodb://127.0.0.1:27017/";
const port = 3000;

let mongoDB;
let pgnCollection;
mongo.connect(mongoUrl, (err, client) => {
  if(err) {
    console.log(err);
    return;
  }
  mongoDB = client.db("chess");
  pgnCollection = mongoDB.collection('pgns');
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/pgn', async (req, res) => {
  pgnCollection.findOne( (err, item) => {
    if(err) throw err;
    res.status(200).send({pgn: item.pgn});
  })
});

app.get('/pgns', async (req, res) => {
  try{
    const limit = parseInt(req.query.limit || 10);
    const offset = parseInt(req.query.offset);
    const data = await pgnCollection.find()
      .skip(offset)
      .limit(limit)
      .toArray();
    const totalDataCount = await pgnCollection.count();

    res.status(200).send({
      data: data,
      totalDataCount: totalDataCount,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(500).send({data: null});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
