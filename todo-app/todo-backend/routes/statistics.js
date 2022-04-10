const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis')


router.get('/', async(_,res) => {
    let count = await getAsync('count')
    if (!count) count = 0
    res.send({added_todos: count})
});


module.exports = router;