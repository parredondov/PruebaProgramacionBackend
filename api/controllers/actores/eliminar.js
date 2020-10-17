module.exports = {


  friendlyName: 'Eliminar',


  description: 'Eliminar actores.',


  inputs: {
    id:  {
      required: true,
      type: 'number',
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    console.log(inputs.id);
    // All done.
    var actorElminado = await User.updateOne({ id: inputs.id })
    .set({
      active: 0
    });
    return;

  }


};
