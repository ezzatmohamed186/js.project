class Exam {
    constructor(questions) {
        this.questions = questions; // Keep questions in order
        this.currentIndex = 0;
        this.correctAnswers = 0;
        this.timerInterval = null;
        this.init();
    }

    init() {
        document.getElementById('startExam').addEventListener('click', () => this.startExam());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
    }

    startExam() {
        document.getElementById('homeContainer').classList.add('d-none');
        document.getElementById('examContainer').classList.remove('d-none');
        this.loadQuestion();
    }

    startTimer() {
        let timeLeft = 10;
     
        this.timerInterval = setInterval(() => {
            timeLeft--;
         
            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.nextQuestion();
            }
        }, 1000);
    }

    loadQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        
        clearInterval(this.timerInterval);
        this.startTimer();
        const questionData = this.questions[this.currentIndex];
        document.getElementById('questionTitle').innerText = questionData.title;
        document.getElementById('questionImage').src = questionData.image;
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';
        
        this.shuffleArray(questionData.answers).forEach(answer => {
            const button = document.createElement('button');
            button.className = 'list-group-item list-group-item-action';
            button.innerText = answer;
            button.addEventListener('click', () => this.selectAnswer(button, answer, questionData.correct));
            answersContainer.appendChild(button);
        });
        document.getElementById('nextQuestion').disabled = true;
    }

    selectAnswer(button, selectedAnswer, correctAnswer) {
        document.querySelectorAll('#answers button').forEach(btn => btn.disabled = true);
        button.style.backgroundColor = 'gray';
        if (selectedAnswer === correctAnswer) {
            this.correctAnswers++;
        }
        document.getElementById('nextQuestion').disabled = false;
    }

    nextQuestion() {
        this.currentIndex++;
        this.loadQuestion();
    }

    showResults() {
        clearInterval(this.timerInterval);
        document.getElementById('examContainer').classList.add('d-none');
        document.getElementById('resultContainer').classList.remove('d-none');
        const percentage = (this.correctAnswers / this.questions.length) * 100;
        const scoreCircle = document.getElementById('scoreCircle');
        scoreCircle.innerText = `${percentage.toFixed(0)}%`;
        scoreCircle.style.border = `10px solid ${percentage >= 50 ? 'green' : 'red'}`;
    }

    shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

const questions = [
    { title: "Q1:Which tag is used to create a hyperlink?", image: "Assits/image1.jpg", answers: ['a) <link>', 'b)<hyper>', 'c)<a>', 'd)<url>'], correct: 'c)<a>' },
    { title: "Q2:Which tag is used to define an unordered list??", image: "Assits/image2.jpg", answers: ['a) <ol>', 'b) <ul>', 'c) <list>', 'd) <dl>'], correct: 'b) <list>' },
    { title: "Q3:Which tag is used to define a table row?", image: "Assits/image3.jpg", answers:['a) <td>', 'b) <th>', 'c)<tr>', 'd)<tablerow> '] , correct: 'c) <tr>' },
    { title: "Q4:Which  tag to insert image?", image: "Assits/image4.jpg", answers:['a) <picture>', 'b) <image>', 'c)  <src>', 'd) <img>'], correct: 'd) <img>' },
    { title: "Q5:Which tag is used to create a hyperlink in HTML?", image: "Assits/image5.jpg", answers: ['a) <link>', 'b) <a>', 'c) <href>', 'd) <url>'], correct: 'b) <a>' },
    { title: "Q6:Which of the following is NOT a valid way to declare a variable in JavaScript?", image: "Assits/image6.jpg", answers: ['a) var x = 10;', 'b) let x = 10;', 'c) const x = 10;', 'd) variable x = 10;'], correct: 'd) variable x = 10;' },
    { title: "Q7:What does CSS stand for?", image: "Assits/image7.jpg", answers: ['a) Computer Style Sheets', 'b) Cascading Style Sheets', 'c) Creative Styling System', 'd) Colorful Sheet Styles'] , correct: 'b) Cascading Style Sheets' },
    { title: "Q8:Which method is used to fetch data from an API in JavaScript?", image: "Assits/image8.jpg", answers:['a) getData()', 'b) fetch()', 'c) requestAPI()', 'd) callAPI()'], correct: 'b) fetch()' },
    { title: "Q9:Which HTML element is used for the largest heading?", image: "Assits/image5.jpg", answers: ['a) <h1>', 'b) <heading>', 'c) <h6>', 'd) <h>'], correct: 'a) <h1>' },
    { title: "Q10:Which of the following is NOT a front-end framework?", image: "Assits/image4.jpg", answers: ['a) React', 'b) Angular', 'c) Vue', 'd) Node.js'], correct: 'd) Node.js' }
];

new Exam(questions);