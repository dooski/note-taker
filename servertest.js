// Require in Express, path, fs
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 4340;


// Parse data with the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// // API routes
const notesFile = JSON.parse(fs.readFileSync("db/db.json"));
// Retrieve saved notes
app.get("/api/notes", (req, res) => {
    console.log("here's your response", res)
    return res.json(notesFile);
});

// Write notes to db.json file
app.post("/api/notes", (req, res) => {
    let newNote = req.body
    notesFile.push(newNote);
    notesFile.forEach((element, i) => {
        element.id = i + 1;
    });
    console.log(notesFile, "This is the notes file");
    fs.writeFileSync("db/db.json", JSON.stringify(notesFile));
    res.json(notesFile);
});

// MISSING DELETE ROUTE; WAS UNABLE TO WORK ON IT BECAUSE I COULDN'T GET MY NOTES TO POST TO THE HTML

// Starter server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});