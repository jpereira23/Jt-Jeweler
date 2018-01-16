const config = require('../../config.json');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const Q = require('q');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

/**
 * Everything below is for the user collection
 */

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
// Confirmation of adding a user


router.post('/checkEmail', (req, res) => {
  var user = req.body;
  var token = "";
  crypto.randomBytes(48, function(err, buffer) {
    token = buffer.toString('hex');
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        clientId: '162628555345-v85tu2hh6dp9bm57ot8duqs2f96088nv.apps.googleusercontent.com',
        clientSecret: 'Mv-F-cpmw9fYBTai5UadWqbt',
      }
    }); 

    var mailOptions = {
      from: 'jefferypereira3@gmail.com',
      to: user.email,
      subject: 'Welcome to JT Jewlery - Verify your account',
      html: '<body><span>Welcome to JT Jewelery ' + req.body.firstName + ' ' + req.body.lastName + ',</span><br><span>Here is a link to verify your account</span><br><a href="http://192.168.1.69:4200/confirmAccount?id=' + token + '">Verify Account</a></body>',
      auth: { 
        user: 'jefferypereira3@gmail.com', 
        refreshToken: '1/47UqC3mM14Zf5YJ3cuwLo0zLGdcqv_-ps2Co5KBnshFk4N_UWzZdI0g2VAU2WgOC', 
        accessToken: 'ya29.GltEBYvAgDdu49C1PMAhBZySbxzd3SdE8n8i6swdEHjcvN18YhkDUEG9fsJLjw_h-Y5uYe8Ulv1qYvOsEKB2R-lw3WhB3uPGYHJ0gqVl8tZmG71IXsKPwr2tsB0J',
        expires: 3600
      }
    };
    user.token = token;
    transporter.sendMail(mailOptions, function(error, info){
      if(error)
      {
        console.log(error);
        res.json({yo: 'error'});
      }
      else
      {
        connection((db) => {
          db.collection('tempUser')
            .save(user, function(err, user){
              if(err)
              {
                console.log(err);
                res.send(err);
              }
              else
              {
                console.log("Successful");
                res.json(user);
              }
            });
        }); 
      };
    });
  });

});


// Helping the user change their password when they forget

router.post('/forgetPassword', (req, res) => {
  var user = req.body;
  crypto.randomBytes(48, function(err, buffer) {
    token = buffer.toString('hex');
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        clientId: '162628555345-v85tu2hh6dp9bm57ot8duqs2f96088nv.apps.googleusercontent.com',
        clientSecret: 'Mv-F-cpmw9fYBTai5UadWqbt',
      }
    }); 

    var mailOptions = {
      from: 'jefferypereira3@gmail.com',
      to: user.email,
      subject: 'JT Jewlery - Password Recovery System',
      html: 'Hello ' + req.body.firstName + ' ' + req.body.lastName + ',</span><br><span>At JT Jewelry we ensure our customers protectiona and security. Use this link to verify your account and change your password.</span><br><a href="http://192.168.1.69:4200/newForgottenPassword?id=' + token + '">Verify Account</a></body>',
      auth: { 
        user: 'jefferypereira3@gmail.com', 
        refreshToken: '1/47UqC3mM14Zf5YJ3cuwLo0zLGdcqv_-ps2Co5KBnshFk4N_UWzZdI0g2VAU2WgOC', 
        accessToken: 'ya29.GltEBYvAgDdu49C1PMAhBZySbxzd3SdE8n8i6swdEHjcvN18YhkDUEG9fsJLjw_h-Y5uYe8Ulv1qYvOsEKB2R-lw3WhB3uPGYHJ0gqVl8tZmG71IXsKPwr2tsB0J',
        expires: 3600
      }
    };
    user.token = token;
    transporter.sendMail(mailOptions, function(error, info){
      if(error)
      {
        console.log(error);
        res.json({yo: 'error'});
      }
      else
      {
        connection((db) => {
          db.collection('user')
            .update({'_id': ObjectID(req.body._id)}, {'firstName:': req.body.firstName, 'lastName': req.body.lastName, 'password': req.body.password, 'email': req.body.email, 'streetAddress': req.body.streetAddress, 'city': req.body.city, 'state': req.body.state, 'wishList': req.body.wishList, 'orders': req.body.orders, 'token': req.body.token }, { $multi: true }, function(err, user){
              if(err)
              {
                console.log(err);
                res.send(err);
              }
              else
              {
                console.log("Successfully updated user");
                res.json(user);
              }

            });
        }); 
      };
    });
  });

});

// Helping with removing one of the temporary users

router.get('/tempUsers', (req, res) => {
  connection((db) => {
    db.collection('tempUser')
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

// Remove one of the temporary users
router.delete('/tempUser/:id', (req, res) => {
  var user = req.body;
  connection((db) => {
    db.collection('tempUser')
      .remove({_id: ObjectID(req.body._id)}, function(err, user) {
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



// Add a user
router.post('/adduser', (req, res) => {
    var user = req.body;
    console.log('the user name is ' + user.firstName);
    connection((db) => {
      db.collection('user')
        .save(user, function(err, user){
          if(err)
          {
            console.log(err);
            res.send(err);
          }
          else
          {
            console.log("Successful");
            res.json(user);
          }
        });
    });
}); 

// Edit a user
router.put('/user/:id', (req, res) => {
    console.log(req.body.orders.length);      
    console.log(req.body.password); 
    connection((db) => {
    db.collection('user')
      .update({'_id': ObjectID(req.body._id)}, {'firstName:': req.body.firstName, 'lastName': req.body.lastName, 'password': req.body.password, 'email': req.body.email, 'streetAddress': req.body.streetAddress, 'city': req.body.city, 'state': req.body.state, 'wishList': req.body.wishList, 'orders': req.body.orders, 'token': req.body.token }, { $multi: true }, function(err, user){
        if(err)
        {
          console.log(err);
          res.send(err);
        }
        else
        {
          console.log("Successfully updated user");
          res.json(user);
        }
      });
    });
}); 


// Remove a user
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


/**
 * Everything below is for the jewelry collection
 */

router.get('/jewelry', (req, res) => {
    connection((db) => {
        db.collection('jewelry')
            .find()
            .toArray()
            .then((jewelry) => {
                response.data = jewelry;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Add Jewel
router.post('/addjewelry', (req, res) => {
    var jewel = req.body;
    connection((db) => {
      db.collection('jewelry')
        .save(jewel, function(err, user){
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.json(jewel);
          }
        });
    });
}); 

// Edit a jewel
router.put('/jewel/:id', (req, res) => {
  
  connection((db) => {
    db.collection('jewelry')
      .update({'_id': ObjectID(req.body._id)}, {'jewelName': req.body.jewelName, 'price': req.body.price, 'quantity': req.body.quantity, 'sizes': req.body.sizes, 'colors': req.body.colors, 'isFemale': req.body.isFemale, 'isMale': req.body.isMale, 'category': req.body.category, 'images': req.body.images, 'popularRank': req.body.popularRank, 'itemCode': req.body.itemCode, 'centerStone': req.body.centerStone, 'weightOneDim': req.body.weightOneDim, 'weightThreeDim': req.body.weightThreeDim, 'shape': req.body.shape, 'clarity': req.body.clarity, 'metal': req.body.metal, 'details': req.body.details, 'formalDescription': req.body.formalDescription, 'video': req.body.video },{ $multi: true } , function(err, jewel){
        if(err)
        {
          res.send(err);
          console.log("Did not work"); 
        }
        else
        {
          console.log("it worked"); 
          res.json(jewel);
        }
      });
    });
}); 

// Remove a jewel
router.delete('/jewel/:id', (req, res) => {
  var jewel = req.body;
  connection((db) => {
    db.collection('jewelry')
      .remove({_id: ObjectID(req.params.id)}, function(err, jewel){
        if(err)
        {
          console.log("Not working");
          res.send(err);
        }
        else
        {
          console.log("Working");
          res.json(jewel);
        } 
      });
  });

});

/**
 * Sizes stuff
 *
 */

router.post('/addsize', (req, res) => {
  var size = req.body;
    connection((db) => {
      db.collection('sizes')
        .save(size, function(err, size){
          if(err)
          {
            res.send(err);
          }
          else
          {
            res.json(size);
          }
        });
    });

});


router.get('/size', (req, res) => {
    connection((db) => {
        db.collection('sizes')
            .find()
            .toArray()
            .then((size) => {
                response.data = size;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * Images stuff
 */

router.post('/addimage', (req, res) => {
  var image = req.body;
  connection((db) => {
    db.collection('images')
    .save(image, function(err, image){
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.json(image);
      }
    });
  });
});

router.get('/image', (req, res) => {
    connection((db) => {
        db.collection('images')
            .find()
            .toArray()
            .then((image) => {
                response.data = image;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * Videos stuff
 *
 */

router.post('/addvideo', (req, res) => {
  var video = req.body;
  connection((db) => {
    db.collection('videos')
    .save(video, function(err, video){
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.json(video);
      }
    });
  });
});

router.get('/video', (req, res) => {
    connection((db) => {
        db.collection('videos')
            .find()
            .toArray()
            .then((video) => {
                response.data = video;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * order stuff
 */

router.put('/updateordernumber/:id', (req, res) => {
  console.log("FUCKING WORK"); 
  connection((db) => {
    db.collection('ordernumber')
    .update({'_id': ObjectID(req.body._id)}, {'orderNum': req.body.orderNum},{ $multi: true } , function(err, ordernumber){
      if(err)
      {
        res.send(err);
        console.log("Did not work");
      }
      else
      {
        console.log("it worked");
        res.json(ordernumber);
      }
    });
  });
});

router.get('/ordernumber', (req, res) => {
  connection((db) => {
    db.collection('ordernumber')
    .find()
    .toArray()
    .then((ordernumber) => {
      response.data = ordernumber;
      res.json(response);
    })
    .catch((err) => {
      sendError(err, res);
    }); 
  });
});
router.get('/order', (req, res) => {
  connection((db) => {
    db.collection('order')
      .find()
      .toArray()
      .then((order) => {
        response.data = order;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/addorder', (req, res) => {
  var order = req.body;
  console.log("order is added");
  connection((db) => {
    db.collection('order')
    .save(order, function(err, order){
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.json(order); 
      }
    });
  });
});


module.exports = router;
