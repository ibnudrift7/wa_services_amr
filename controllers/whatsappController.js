const axios = require('axios');

exports.sentMessageWA = async (req, res, next) => {
    try {
        const {phone, message} = req.body
        if (!phone || !message) {
            res.status(400).json({message: "phone and message is required"})
        }

        let phone_number = phone
        if (phone_number.startsWith('08')) {
            phone_number = phone_number.replace('08', '+628')
        }
        let urlWa = 'https://gontak.com/api/send/whatsapp'
        
        const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm
        const subst = ``
        const result = message.replace(regex, subst)

        const chat = {
            secret: process.env.WA_SECRET_KEY,
            account: 7,
            recipient: phone_number,
            type: "text",
            message: result,
        };
        const options = {
            url: urlWa,
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify(chat),
        };
        console.log(options, 'options');
        const response = await axios(options)

        return res.status(200).json({message: "success", data: response.data})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "failed", data: e})
    }
}

exports.sentPosts = async (req, res, next) => {
    try{
        const data = {
            title: 'foo',
            body: 'bar',
            userId: 1,
            };

            const options = {
                url: 'https://jsonplaceholder.typicode.com/posts',
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                data: JSON.stringify(data),
            };
        axios(options)
        .then((response) => response.data)
        .then((json) => console.log(json))
        .catch((error) => console.error(error));
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "failed", data: e})
    }
}