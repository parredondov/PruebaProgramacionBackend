const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Jwt issue',


  description: '',


  inputs: {
    payload:{
      type: 'ref',
      require: true
    }
  },

  exists:{

  },

  fn: async function (inputs) {
    var t = jwt.sign(
      inputs.payload,
      sails.config.custom.jwtSecret, // Token Secret that we sign it with
      {
        expiresIn: "30 days" // Token Expire time
      }
    );
    return t;
  }


};

