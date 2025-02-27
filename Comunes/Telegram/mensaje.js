//Envio de mensaje por Telegram al nuevo usaurio
export const telegramWMsg = async (nombre, chatId) => {
    try {
        const tokenT = process.env.TELEGRAM_BOT_TOKEN;
        const mensaje = `Hola ${nombre} bienvenido a la App!!`;
        const url = `https://api.telegram.org/bot${tokenT}/sendMessage`;
        const bodyMessageT = {
            chat_id: chatId,
            text: mensaje
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyMessageT)
        });
        const data = await response.json();
        if (data.ok) {
            console.log('Mensaje enviado a Telegram con exito!!');
        }
        
    } catch (err) {
        console.error('Error al enviar texto a telegram', err);
    }
};

//Envio de Tarea creada via telegram
export const telegramNTask = async (nombre, tarea, fechaEstimada, chatId) => {
    try {
        const tokenT = process.env.TELEGRAM_BOT_TOKEN;
        const url = `https://api.telegram.org/bot${tokenT}/sendMessage`;
        const mensaje = `Hola ${nombre} tienes una nueva tarea asignada:
                         Tarea       : ${tarea}
                         F. Est. fin : ${fechaEstimada}`;
        const bodyMessageT = {
            chat_id: chatId,
            text: mensaje
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyMessageT)
        });
        const data = await response.json();
        if (data.ok) {
            console.log('Mensaje enviado a Telegram con exito!!');
        }                    
    } catch (err) {
        console.error('Error al enviar texto a telegram', err);
    }
};