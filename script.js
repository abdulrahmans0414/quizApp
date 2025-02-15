document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the capital of India?",
            choices: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
            answer: "New Delhi",
        },
        {
            question: "Which river is considered the holiest in India?",
            choices: ["Yamuna", "Ganga", "Godavari", "Brahmaputra"],
            answer: "Ganga",
        },
        {
            question: "Who is known as the 'Father of the Nation' in India?",
            choices: ["Jawaharlal Nehru", "Bhagat Singh", "Mahatma Gandhi", "Subhas Chandra Bose"],
            answer: "Mahatma Gandhi",
        },
        {
            question: "Which Indian festival is known as the 'Festival of Lights'?",
            choices: ["Holi", "Diwali", "Dussehra", "Eid"],
            answer: "Diwali",
        },
        {
            question: "Which is the national animal of India?",
            choices: ["Lion", "Elephant", "Tiger", "Leopard"],
            answer: "Tiger",
        },
        {
            question: "Who wrote the Indian national anthem, 'Jana Gana Mana'?",
            choices: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Mahatma Gandhi"],
            answer: "Rabindranath Tagore",
        },
        {
            question: "Which is the largest state in India by area?",
            choices: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"],
            answer: "Rajasthan",
        },
        {
            question: "Which city is known as the 'Pink City' of India?",
            choices: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer"],
            answer: "Jaipur",
        },
        {
            question: "Which Indian monument is one of the Seven Wonders of the World?",
            choices: ["Qutub Minar", "Taj Mahal", "Red Fort", "Hawa Mahal"],
            answer: "Taj Mahal",
        },
        {
            question: "Who was the first Prime Minister of India?",
            choices: ["Indira Gandhi", "Jawaharlal Nehru", "Lal Bahadur Shastri", "Rajendra Prasad"],
            answer: "Jawaharlal Nehru",
        },
    ];

    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const scoreText = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");


    let currentQuestionIndex = 0;
    let score = 0;

    // Start the quiz
    startBtn.addEventListener("click", startQuiz);

    // Restart the quiz
    restartBtn.addEventListener("click", restartQuiz);

    // Move to the next question
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    function startQuiz() {
        startBtn.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        choicesList.innerHTML = "";

        currentQuestion.choices.forEach((choice) => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => checkAnswer(choice, li));
            choicesList.appendChild(li);
        });

        // Disable Next button until an answer is selected
        nextBtn.disabled = true;
    }

    function checkAnswer(selectedChoice, liElement) {
        const currentQuestion = questions[currentQuestionIndex];

        // Remove any existing correct/wrong classes
        Array.from(choicesList.children).forEach((li) => {
            li.classList.remove("correct", "wrong");
        });

        if (selectedChoice === currentQuestion.answer) {
            liElement.classList.add("correct");
            score++;
        } else {
            liElement.classList.add("wrong");
            // Highlight the correct answer
            Array.from(choicesList.children).forEach((li) => {
                if (li.textContent === currentQuestion.answer) {
                    li.classList.add("correct");
                }
            });
        }

        // Disable further clicks on choices
        Array.from(choicesList.children).forEach((li) => {
            li.style.pointerEvents = "none";
        });

        // Enable the Next button
        nextBtn.disabled = false;
    }

    function showResults() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreText.textContent = `${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
    }

});