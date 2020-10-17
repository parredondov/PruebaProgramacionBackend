module.exports = {


  friendlyName: 'Crear actor',


  description: 'Registra un nuevo actor en el sistema.',


  inputs: {
    fullName:  {
      required: true,
      type: 'string',
      example: 'Keanu Reeves',
      description: 'Nombre completo del actor',
    }
  },


  exits: {

    success: {
      description: 'Se ha registrado correctamente.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'El nombre ingresado no es válido'
    },

    actorHaSidoIngresado: {
      statusCode: 409,
      description: 'Ya existe un actor registrado con ese nombre.',
    },

  },


  fn: async function (inputs) {

    let nombre = inputs.fullName.trim();
    
    var actor = await Actor.create(_.extend({
      nombre,
      createdBy: this.req.me.fullName
    }, {}))
    .intercept('E_UNIQUE', 'actorHaSidoIngresado')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();
    // All done.
    return actor;

  }


};
