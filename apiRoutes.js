const storedNotes = require('./db/db.json');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(storedNotes));
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        storedNotes.push(newNote);
        res.json(newNote);
    })
}