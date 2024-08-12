const express = require('express');
const Flashcard = require('../models/Flashcard');
const router = express.Router();

// Get all flashcards
router.get('/', (req, res) => {
    Flashcard.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new flashcard
router.post('/', (req, res) => {
    const data = req.body;
    Flashcard.create(data, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

// Update a flashcard
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Flashcard.update(id, data, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete a flashcard
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Flashcard.delete(id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
