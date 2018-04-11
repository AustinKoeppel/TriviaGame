var clockRunning = false;
var interval;

function Question(question, answers, correct){
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

var quiz = {
    score : 0,
    index : 0,
    difficulty: 3,
    timer : 30,
    questions : [],
    setTimer : function() {
        quiz.timer = 10*quiz.difficulty;
    }
}

var questionArr = ["What book did the fellowship find in the mines of moria?",
                    "Who are the two watchers?",
                    "",
                    "",
                    "",
                    ""];
var answers = [["Book of Mazarbul","The Tome of Kazaran","The Scroll of D'Hazan","The Scroll of Ah'Aral"],
                ["The two stone gaurdians of unamed kings on the river Andal","The gargoyles outside of Cirith Ungol","The giant squids outside of Mordor","The twin goblin spies Far'ak and Lor'ak"],
                [],
                [],
                []];
var correct = [0,1,0,0,0];

function init() {
    for(var i = 0; i < questionArr.length; i++) {
        var question = new Question(questionArr[i],answers[i],correct[i])
        quiz.questions.push(question);
    }
}

function drawScreen() {
    quiz.setTimer();
    let answerSection = document.getElementById("answers");
    answerSection.innerHTML = "";
    let question = quiz.questions[quiz.index];
    document.getElementById("question").textContent = question.question;

    for(var i = 0; i < question.answers.length; i++) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        li.classList.add("button");
        div.classList.add("answer");
        div.id = "button" + i;
        div.innerHTML = quiz.questions[quiz.index].answers[i];
        div.onclick = answer;
        div.setAttribute("number",i);
        li.appendChild(div);
        answerSection.appendChild(li)
    }
    interval = setInterval(count,1000);
}

function wrong(x) {
    if(x != 4) {
        let id = "button" + x;
        document.getElementById(id).style.backgroundColor = "red";
    }
    right();
}

function right() {
    let id = "button" + quiz.questions[quiz.index].correct;
    quiz.index++;
    document.getElementById(id).style.backgroundColor = "green";
    if(quiz.index < 5)
    {
        var timeout = setTimeout(drawScreen,2000);
    }
    else{
        replay();
    }
}

function evaluate(x) {
    clearInterval(interval);
    if(x == undefined || quiz.questions[quiz.index].correct == x) {
        wrong(4);
    }
    else {
        wrong(x);
    }
}

function casual() {
    quiz.difficulty = 3;
    quiz.setTimer();
    drawScreen();
}

function hard() {
    quiz.difficulty = 1.5;
    quiz.setTimer();
    drawScreen();
}

function replay() {

}

function answer() {
    clearInterval(interval);
    let e = event.target;
    let x = e.getAttribute("number");
    evaluate(x);
}

function moveOn() {

}

window.onload = function() {
    init();
}

function count() {
    if(quiz.timer == 0)
    {
        clearInterval(interval);
        evaluate(4);
    }
    else {
        quiz.timer--;
        document.getElementById("timer").textContent = quiz.timer;
    }
}