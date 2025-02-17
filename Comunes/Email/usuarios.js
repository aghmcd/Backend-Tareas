import sgEmail from '@sendgrid/mail'
import 'dotenv/config';

const apikeySendgrid = process.env.API_KEY_EMAIL;
sgEmail.setApiKey(apikeySendgrid);

export const bodyEmail = (cuentaEmail, avatarEmail, uIDEmail) => {
    const msg = {
        to: cuentaEmail,
        from: 'jorirovi@icloud.com',
        subject: 'Bienvenido a la Aplicación',
        text: 'Este es un email enviado desde la aplicacion',
        html: `<strong>Bienvenido, espero disfrute la aplicacion</strong>
                <img src=${avatarEmail} alt=${uIDEmail} style="width: 100px; height: 100px; border-radius: 50%; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"/>`
    };
    sgEmail.send(msg)
        .then(() => console.log("Correo enviado con exito"))
        .catch((err) => console.error('Error enviando email:', err));
}


            