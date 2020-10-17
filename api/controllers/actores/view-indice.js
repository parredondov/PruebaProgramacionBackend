module.exports = {


  friendlyName: 'View indice',


  description: 'Display "Indice" page.',


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/actores/indice'
    }

  },


  fn: async function () {
    
    var actores = await Actor.find({active: 1});
    // All done.
    return {
      items: actores
    };

  }


};
