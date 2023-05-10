let cards = [];
let openedCard = {};
let tryCounter = 0;
let trying = false;
let timer = 60;

function init() {
    addCardCouple('flower', 'imgs/flower.png');
    addCardCouple('eye', 'imgs/eye.png');
    addCardCouple('hand', 'imgs/hand.png');
    addCardCouple('heart', 'imgs/heart.png');
    addCardCouple('piano', 'imgs/piano.png');
    shuffle();
    drawAllCards();
    updateTimer();
};

init();
let remainingCards = cards.length;

function addCardCouple(name, imgFile = ``, solved = false) {
    const card = createCard(name, imgFile, solved);
    const identicalCard = createCard(name, imgFile, solved);
    cards.push(card, identicalCard);
}
function createCard(name, imgFile, solved) {
    const card = document.createElement(`button`);
    const img = document.createElement(`img`);
    img.src = imgFile;
    card.append(img);
    card.name = name;
    card.solved = solved;
    img.style.opacity = 0;
    card.onclick = cardOnClick;
    card.classList.add("card");
    return card;
}

function shuffle() {
    for (let card in cards) {
        flipCardWithAnother(card);
    }
}

function flipCardWithAnother(cardIndex) {
    let anotherCardIndex = Math.ceil(Math.random() * (cards.length - 1));
    let memory = {};
    memory = cards[anotherCardIndex];
    cards[anotherCardIndex] = cards[cardIndex];
    cards[cardIndex] = memory;
    // Object.assign(memory, cards[anotherCardIndex]);
    // Object.assign(cards[anotherCardIndex], cards[cardIndex]);
    // Object.assign(cards[cardIndex], memory);
}

function drawCardOnScreen(card) {
    document.getElementById('board').append(card);
}


function drawAllCards() {
    for (let cardIndex in cards) {
        drawCardOnScreen(cards[cardIndex]);
    };
};

function solved(firstCard, secondCard) {
    console.log(`yesss`);
    firstCard.classList.add(`solved`);
    secondCard.classList.add(`solved`);
    remainingCards -= 2;
    openedCard = {};
}

function win() {
    let winningScreen = document.getElementById('winning-screen');
    let button = document.createElement(`button`);
    button.onclick = () => location.reload();
    winningScreen.appendChild(document.createElement(`h2`)).appendChild(document.createTextNode(`you did it!!!\n and it took you just ${tryCounter} attempts`));
    winningScreen.append(button);
    button.append(document.createTextNode(`PLAY AGAIN`));
    winningScreen.style.visibility = `visible`;
}
function lose() {
    let losingScreen = document.getElementById('losing-screen');
    let button = document.createElement(`button`);
    button.onclick = () => location.reload();
    losingScreen.appendChild(document.createElement(`h2`)).appendChild(document.createTextNode(`oh! you run out of time`));
    losingScreen.append(button);
    button.append(document.createTextNode(`PLAY AGAIN`));
    losingScreen.style.visibility = `visible`;
}

function cardOnClick(e) {
    const card = e.currentTarget;
    if (trying || card.classList.contains("solved") || card === openedCard) {
        return;
    }
    trying = true;
    card.firstElementChild.style.opacity = 1;
    if (openedCard.name) {
        if (card.name === openedCard.name) {
            solved(card, openedCard);
            if (remainingCards === 0) {
                window.setTimeout(() => {
                    win();
                }, 200)
            }
            trying = false;
        } else {
            window.setTimeout(() => {
                card.firstElementChild.style.opacity = 0;
                openedCard.firstElementChild.style.opacity = 0;
                openedCard = {};
                trying = false;
            }, 500);
        }
        tryCounter++;
    } else {
        openedCard = card;
        trying = false;
    }
}

function updateTimer() {
    const timerElement = document.getElementById('time');
    timerElement.innerText = timer;
}
setInterval(() => {
    if (timer > 0) {
        timer--;
        updateTimer();
        if (timer === 0) {
            console.log(`you lose`);
            lose();
        };
    };
}, 1000)
