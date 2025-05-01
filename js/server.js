const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para enviar el correo
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'goatsportconnections@gmail.com', // tu correo
            pass: 'contraseña-o-clave-de-app'        // no la real, sino la "clave de aplicación"
        }
    });

    const mailOptions = {
        from: email,
        to: 'goatsportconnections@gmail.com',
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Correo enviado exitosamente');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
