const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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
            user: process.env.EMAIL_USER, // se define en Azure portal
            pass: process.env.EMAIL_PASS  // clave de aplicación, también se define allí
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Correo enviado exitosamente');
        }
    });
});

// En producción: servir archivos estáticos
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public'))); // o 'dist' según tu estructura
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html')); // ajusta si usas otra carpeta
    });
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
