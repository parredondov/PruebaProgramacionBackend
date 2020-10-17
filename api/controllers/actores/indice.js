module.exports = {


  friendlyName: 'Indice',


  description: 'Indice actores.',


  inputs: {
  },


  exits: {

  },


  fn: async function () {

    var actores = await Actor.find({active: 1});
    // All done.
    return actores;

  }


};
