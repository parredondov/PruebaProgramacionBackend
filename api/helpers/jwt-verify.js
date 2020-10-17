const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Jwt verify',


  description: 'Verifica el token del usuario',


  inputs: {
    bearer: {
      type: 'string',
      friendlyName: 'token',
      required: true
    },
    req: {
      type: 'ref',
      friendlyName: 'Request',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },
    
    invalid: {
      description: 'Token expirado o no existente.',
    }

  },


  fn: async function (inputs, exits) {
    let bearerToken = inputs.bearer
    
    try{
      return jwt.verify(bearerToken, sails.config.custom.jwtSecret, async function (err, payload) {
        if (err || !payload.id) return exits.invalid()
        var user = await User.findOne(payload.id)
        if (!user) return exits.invalid()
        // if it got this far, everything checks out, success
        inputs.req.session.userId = user.id;
        return exits.success();
      })
    }catch(err){

    }
    
    return exits.invalid()
  }


};

