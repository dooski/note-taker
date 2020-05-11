const fs = require("fs");
const path = require("path");

// express configuration
const express = require("express");
const port = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes 
// ------
// html route to notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
// html route to index (home) page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// json route to read notes
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")));
});

const notes = []

// new notes route, writes to db.json notes, pulls it back to display
app.post("/api/notes", function (req, res) {
    let note = req.body
    notes.push({
        title: note.title,
        text: note.text,
        id: notes.length - 1
    });
    fs.writeFileSync("db/db.json", JSON.stringify(notes))
    res.json(notes);
});

// delete notes route, using unique ID element
app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    notes = notes.filter(function (note) {
        return note.id !== id;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    return res.json(notes)
});

// server functionality
// activates the server and delivers the port to the console
app.listen(port, function () {
    console.log("Listening on Port" + port);
});
