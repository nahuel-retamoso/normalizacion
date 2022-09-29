const mongoContainer = require('./contenedores/MongoDB.js');

class MensajesDAO extends mongoContainer.MongoCRUD {
    constructor() {
        super({
            url: 'mongodb://localhost:27017',
            dbName: 'ecommerce',
            collection: 'mensajes'
        });
    }

    //guardar mensaje
    async guardarMensaje(mensaje) {
        try {
            return await this.create(mensaje);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { MensajesDAO };