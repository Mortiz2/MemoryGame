document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.tile');
    const counterElement = document.getElementById('counter');
    const timerElement = document.getElementById('timer');
    let guesses = 0;
    let seconds = 0;
    let timerRunning = false;
    let timerInterval, firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matchedCards = 0;

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(function () {
                if (timerRunning) {
                    seconds++;
                    timerElement.textContent = `Time: ${seconds}s`;
                }
            }, 1000);
        }
    }

    function flipCard() {
        if (lockBoard) {
            return;
        }

        if (this === firstCard) {
            return;
        }

        this.classList.add('flip');

        if (!hasFlippedCard) {
            startTimer();
            hasFlippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;
            lockBoard = true;
            guesses++;
            counterElement.textContent = `Guesses: ${guesses}`;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedCards++;

        if (matchedCards === cards.length / 2) {
            clearInterval(timerInterval);
            alert(`Game over! You completed the game in ${seconds} seconds with ${guesses} guesses.`);
        }

        resetBoard();
    }

    function unflipCards() {
        setTimeout(function () {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 600);
    }

    function resetBoard() {
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    }

    function shuffle() {
        cards.forEach(function (card) {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    shuffle();

    cards.forEach(function (card) {
        card.addEventListener('click', flipCard);
    });
});
