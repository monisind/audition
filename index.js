const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');


const MSG_TABLE = process.env.MSG_TABLE;

const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// Get a msg
app.get('/msgs/:user', function (req, res) {
  const params = {
    TableName: MSG_TABLE,
    Key: {
      user: req.params.user,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get msg' });
    }
    if (result.Item) {
      result.Item.palindrome = isPalindrome(result.Item.msg)
      res.json(result.Item);
    } else {
      res.status(404).json({ error: "msg not found" });
    }
  });
})

// Get all msgs
app.get('/msgs', function (req, res) {
  const params = {
    TableName: MSG_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get msg'});
    }
    if (result) {
      res.json(result.Items);
    }
  });
})

// post a msg
app.post('/msg', function (req, res) {
  const { user, msg } = req.body;
  console.log(req)

  const params = {
    TableName: MSG_TABLE,
    Item: {
      user: user,
      msg: msg,
    }
  };
  console.log(params)
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not add msg' });
    }
    res.json({ user, msg });
  });
})


// Delete a msg
app.delete('/msgs/:user', function (req, res) {
  console.log(req.params.user)
  const params = {
    TableName: MSG_TABLE,
    Key: {
      user: req.params.user,
    },
    ReturnValues: 'ALL_OLD'
  }

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete msg' });
    }
    if (result.Attributes) {
      res.json(result.Attributes);
    } else {
      res.status(404).json({ error: "msg not found" });
    }
  });
})


function isPalindrome(msg){
  reversed = msg.split('').reverse().join('')
  return msg == reversed
}

module.exports.handler = serverless(app);