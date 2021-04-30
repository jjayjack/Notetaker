const storedNotes = require('./db/db');
const fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(storedNotes));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        console.log(newNote);
        storedNotes.push(newNote);
        writeToFile('db/db.json', JSON.stringify(storedNotes));
        res.json(storedNotes);
    })

    app.delete(`/api/notes/${id}`, (req, res) => {
        storedNotes.delete(`${id}`);
    })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName,data, function(err){
        if (err) return console.log(err);
        console.log(data);
    })
}