// Users Routes
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res)=>{

    const {name, email} = req.body;

    db.query('INSERT INTO users (user_name, user_email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({id: result.insertId, user_name: name, user_email: email});
    });

});

router.get('/', (req, res)=>{

    db.query('SELECT * FROM users', (err, result)=> {
        if (err) return res.status(500).send(err);
        res.json(result)
    })

})

router.put('/:id', (req, res)=>{

    const {id} = req.params
    const {name, email} = req.body;

    db.query('UPDATE users SET user_name = ?, user_email = ? WHERE id = ?', [name, email, id], (err, result) =>{
        if (err) return res.status(500).send(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({id, user_name: name, user_email: email});
    })

})

router.delete('/:id', (req, res)=>{

    const {id} = req.params
    db.query('DELETE FROM users WHERE id = ?', [id], (err) =>{
        if (err) return res.status(500).send(err);
        res.sendStatus(204)
    })

})


module.exports = router;
