const express = require('express');
const { Router } = express
const { MensajesDAO } = require('./daos/mensajesDao.js');
const socketio = require('socket.io');
const { generateProduct } = require('./faker.js');

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const io = socketio(server);

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');
    const mensajes = await MensajesDAO.getAll();
    socket.emit('messages', mensajes);
});

io.on('new-message', async data => {
    try {
        const mensajes = new MensajesDAO();
        await mensajes.guardarMensaje(data);
        io.emit('messages', await mensajes.obtenerMensajes());
        } catch (error) {
            console.log(error);
            }
            });

app.get('/api/products-tests', (req, res) => {
    const product = generateProduct();
    res.render('vista', { product });
});