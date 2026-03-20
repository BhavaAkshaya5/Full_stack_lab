const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let feedbackData = [];

// GET - Login Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

// POST - Login Validation
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        res.sendFile(path.join(__dirname, "views/survey.html"));
    } else {
        res.send("Invalid Login!");
    }
});

// POST - Submit Survey
app.post("/submit", (req, res) => {
    const { name, rating, service, feedback } = req.body;

    feedbackData.push({ name, rating, service, feedback });

    res.send(`
        <h2>Feedback Submitted Successfully!</h2>
        <a href="/results">View Results</a>
    `);
});

// GET - Display Results
app.get("/results", (req, res) => {
    let tableRows = feedbackData.map(f => `
        <tr>
            <td>${f.name}</td>
            <td>${f.rating}</td>
            <td>${f.service}</td>
            <td>${f.feedback}</td>
        </tr>
    `).join("");

    res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h2>Customer Feedback</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Service</th>
                    <th>Feedback</th>
                </tr>
                ${tableRows}
            </table>
            <br>
            <a href="/">Logout</a>
        </body>
        </html>
    `);
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});