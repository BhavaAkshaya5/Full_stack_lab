$(document).ready(function () {

    var quizData = [
        { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup", "Home Tool Markup"], correct: 0 },
        { question: "Symbol used for jQuery?", options: ["#", "$", "%", "&"], correct: 1 },
        { question: "CSS is used for?", options: ["Structure", "Styling", "Logic", "Database"], correct: 1 },
        { question: "JavaScript is a?", options: ["Markup Language", "Styling Language", "Programming Language", "Query Language"], correct: 2 },
        { question: "Which tag adds JS?", options: ["<js>", "<script>", "<link>", "<javascript>"], correct: 1 },
        { question: "jQuery is a?", options: ["Framework", "Library", "Browser", "Server"], correct: 1 },
        { question: "ID selector symbol?", options: [".", "#", "*", "&"], correct: 1 },
        { question: "MCQ uses which input?", options: ["text", "radio", "checkbox", "button"], correct: 1 },
        { question: "Which event on click?", options: ["hover", "click", "load", "ready"], correct: 1 },
        { question: "Which loads page fully?", options: ["onload", "ready()", "start()", "init()"], correct: 1 }
    ];

    let index = 0, answers = [], score = 0;

    function loadQuestion(i) {
        $("#question-number").text(`Question ${i + 1} of ${quizData.length}`);
        $("#question-text").text(quizData[i].question);
        $("#options").empty().hide().fadeIn(400);

        quizData[i].options.forEach((opt, idx) => {
            let checked = answers[i] === idx ? "checked" : "";
            $("#options").append(`
                <label>
                    <input type="radio" name="option" value="${idx}" ${checked}>
                    ${opt}
                </label>
            `);
        });

        $("#prevBtn").prop("disabled", i === 0);
        $("#nextBtn").text(i === quizData.length - 1 ? "Submit 🎯" : "Next ➡");
    }

    loadQuestion(index);

    $("#nextBtn").click(function () {
        let sel = $("input[name='option']:checked").val();
        if (sel === undefined) {
            alert("⚠ Please select an option!");
            return;
        }
        answers[index] = parseInt(sel);

        if (index < quizData.length - 1) {
            index++;
            loadQuestion(index);
        } else {
            calculateScore();
        }
    });

    $("#prevBtn").click(function () {
        if (index > 0) {
            index--;
            loadQuestion(index);
        }
    });

    function calculateScore() {
        score = 0;
        quizData.forEach((q, i) => {
            if (answers[i] === q.correct) score++;
        });

        $("#quiz-container").hide();
        $("#result-container").fadeIn();
        $("#score").text(`You scored ${score} / ${quizData.length}`);
    }

    $("#restartBtn").click(function () {
        index = 0;
        answers = [];
        score = 0;
        $("#result-container").hide();
        $("#quiz-container").show();
        loadQuestion(index);
    });

});
