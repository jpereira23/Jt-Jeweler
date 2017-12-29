const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/jt-jewelry', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('jt-jewelry');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('user')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/adduser', (req, res) => {
    var user = req.body;
    console.log('the user name is ' + user.firstName);
    connection((db) => {
      db.collection('user')
        .save(user, function(err, user){
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.json(user);
          }
        });
    });
}); 

router.put('/user/:id', (req, res) => {
    var user = req.body;
    var updTask = {};

    if(user.firstName)
    {
      updTask.firstName = user.firstName;
    } 
    connection((db) => {
    db.collection('user')
      .update({_id: ObjectID(req.params.id)}, updTask, {}, function(err, user){
        if(err)
        {
          res.send(err);
        }
        else
        {
          res.json(user);
        }
      });
    });
}); 

router.delete('/user/:id', (req, res) => {
  var user = req.body;
  connection((db) => {
    db.collection('user')
      .remove({_id: ObjectID(req.params.id)}, function(err, user){
        if(err)
        {
          res.send(err);
        }
        else
        {
          res.json(user);
        } 
      });
  });

});

module.exports = router;
