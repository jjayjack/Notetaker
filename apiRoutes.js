const storedNotes = require('./db/db');
const fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(storedNotes));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        if (storedNotes.length >0){
        newNote.id = storedNotes[storedNotes.length-1].id + 1;}
        else {newNote.id = 0};
        storedNotes.push(newNote);
        writeToFile('db/db.json', JSON.stringify(storedNotes));
        res.json(storedNotes);
    })

    app.delete('/api/notes/:id', (req, res) => {
        const removal = req.params.id
        for (let index = 0; index < storedNotes.length; index++) {
            const removed = storedNotes[index];
            
            if (removed.id == removal){
                console.log(removed);
                storedNotes.splice(index, 1);
                break; 
            }
        } console.log(storedNotes);
        writeToFile('db/db.json', JSON.stringify(storedNotes));
        res.json(storedNotes);
    })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName,data, function(err){
        if (err) return console.log(err);
    })
}