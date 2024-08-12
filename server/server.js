const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sweety@123',
  database: 'flashcards_db'
});

db.connect(err => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL Database');
});

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      res.status(500).json({ error: 'Error fetching flashcards' });
    } else {
      res.json(results);
    }
  });
});

// Add a new flashcard
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, results) => {
    if (err) {
      console.error('Error adding flashcard:', err);
      res.status(500).json({ error: 'Error adding flashcard' });
    } else {
      res.status(201).json({ id: results.insertId, question, answer });
    }
  });
});

// Edit an existing flashcard
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err, results) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      res.status(500).json({ error: 'Error updating flashcard' });
    } else {
      res.json({ id, question, answer });
    }
  });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      res.status(500).json({ error: 'Error deleting flashcard' });
    } else {
      res.json({ message: 'Flashcard deleted' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
