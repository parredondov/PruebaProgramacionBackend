/**
 * PeliculasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    indice: async (req, res)=>{ 
        var items = await Pelicula.find({active: 1}).populate('actores');
        // All done.
        return res.status(200).send(items);
    },
    
    crear: async (req, res)=>{
        
        let body = req.body;
        let actoresId = [];

        for await (const actor of body.actores) {
            let item = await Actor.findOne({nombre: actor});
            if(!item){
                let nuevoitem = await Actor.create(_.extend({
                    nombre: actor
                }, {}))
                .fetch();
                actoresId.push(nuevoitem.id);
            }else
                actoresId.push(item.id);
        }

        var pelicula = await Pelicula.create(_.extend({
            anio: body.anio,
            titulo: body.titulo,
            descripcion: body.descripcion,
        }, {}))
        .fetch();
        
        await Pelicula.addToCollection(pelicula.id, 'actores')
        .members(actoresId);

        // All done.
        return res.status(200).send(pelicula)
        
    },
    
    editar: async (req, res)=>{
        
        let _id = req.param('id');
        let body = req.body;
        let actoresId = [];

        for await (const actor of body.actores) {
            let item = await Actor.findOne({nombre: actor});
            if(!item){
                let nuevoitem = await Actor.create(_.extend({
                    nombre: actor
                }, {}))
                .fetch();
                actoresId.push(nuevoitem.id);
            }else
                actoresId.push(item.id);
        }

        var pelicula = await Pelicula.updateOne({ id: _id })
        .set({
            anio: body.anio,
            titulo: body.titulo,
            descripcion: body.descripcion,
        });
        
        await Pelicula.replaceCollection(pelicula.id, 'actores')
        .members(actoresId);
        // All done.
        return res.status(200).send(pelicula)
        
    },
    
    eliminar: async(req, res)=>{
        try{
            let _id = req.param('id');
            var pelicula = await Pelicula.updateOne({ id: _id })
            .set({

                active: 0
            });
            return res.status(200).send();
        }catch(err){
            return res.status(400).send();
        }
    }

};

