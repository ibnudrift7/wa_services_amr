const express = require('express');
const router = express.Router();
const moment = require("moment");
const crypto = require('crypto')
const createError = require("http-errors");
const randomstring = require('uuidv4');
const {sentMessageWA, sentPosts} = require("../controllers/whatsappController");

router.get('/', (req, res, next) => {
    res.send('deweapp - whatsapp service!')
})

router.post('/send_message', sentMessageWA)
router.post('/post_test', sentPosts)

module.exports = router;
