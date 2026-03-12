const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/bmicalculator", function(req, res){

    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;

    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    let bmi = weight / (height * height);

    let category = "";
    let color = "";

    if(bmi < 18.5){
        category = "Underweight";
        color = "orange";
    }
    else if(bmi < 25){
        category = "Normal";
        color = "green";
    }
    else if(bmi < 30){
        category = "Overweight";
        color = "gold";
    }
    else{
        category = "Obese";
        color = "red";
    }

    res.send(`
    <html>
    <head>
    <title>BMI Result</title>

    <style>
    body{
        font-family: Arial;
        background: linear-gradient(to right,#36d1dc,#5b86e5);
        text-align:center;
        padding-top:100px;
    }

    .card{
        background:white;
        width:350px;
        margin:auto;
        padding:30px;
        border-radius:15px;
        box-shadow:0px 5px 15px rgba(0,0,0,0.2);
    }

    h2{
        color:#333;
    }

    .result{
        font-size:20px;
        margin-top:15px;
        color:${color};
        font-weight:bold;
    }

    button{
        padding:10px 20px;
        border:none;
        background:#5b86e5;
        color:white;
        border-radius:5px;
        cursor:pointer;
        margin-top:20px;
    }
    </style>
    </head>

    <body>

    <div class="card">

    <h2>BMI Result</h2>

    <p><b>Name:</b> ${name}</p>
    <p><b>Age:</b> ${age}</p>
    <p><b>Gender:</b> ${gender}</p>

    <p class="result">BMI: ${bmi.toFixed(2)}</p>
    <p class="result">Category: ${category}</p>

    <a href="/">
    <button>Calculate Again</button>
    </a>

    </div>

    </body>
    </html>
    `);

});

app.listen(3000,function(){
    console.log("Server running on port 3000");
});