const db = require('../config/db');

const Flashcard = {
    getAll: (callback) => {
        const query = 'SELECT * FROM flashcards';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO flashcards SET ?';
        db.query(query, data, callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE flashcards SET ? WHERE id = ?';
        db.query(query, [data, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM flashcards WHERE id = ?';
        db.query(query, id, callback);
    }
};

module.exports = Flashcard;
