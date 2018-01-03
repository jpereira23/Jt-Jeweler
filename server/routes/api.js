const config = require('../../config.json');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const Q = require('q');
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

// Authenticate user

router.post('/authenticate', (req, res) => {
  var user = req.body;
  var deferred = Q.defer();
  console.log("Fuck....");
  connection((db) => {
    db.collection('user')
      .findOne({ email: user.email }, (err, aUser) => {
        if(err){
          res.send(err);
        }
        console.log('requested password is ' + user.password);
        console.log('password in system is ' + aUser.password);
        if(user && user.password == aUser.password)
        {
          console.log('user first name is ' + aUser.firstName);
          // authentication should have succeeded
          deferred.resolve({
            _id: aUser._id,
            email: aUser.email, 
            firstName: aUser.firstName,
            lastName: aUser.lastName,
            token: jwt.sign({ sub: aUser._id }, config.secret)
          });
          res.json(aUser);
        }
        else
        {
          //authentication failed
          res.send(err);
        }
    });    
  });
});
module.exports = router;
