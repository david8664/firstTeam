let playerCounter = 6;

const avatars = [
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=826&t=st=1684236472~exp=1684237072~hmac=9896da988c23afd90461b81afa500ebbae4f5902364bc421edef2af72e41b68d",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1684236425~exp=1684237025~hmac=2e6b4da25fd2a82024a7056d8b33fb33bd054f525c22a386db962141bde8a77c",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=826&t=st=1684236472~exp=1684237072~hmac=84ea28dfef7f9c0991650b2baf211c85ff5f382a564996567ac4ab2186606a64",
    "https://img.freepik.com/premium-psd/3d-illustration-person-with-glasses-bow_23-2149436205.jpg?w=826",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?w=826&t=st=1684236474~exp=1684237074~hmac=baaa8fba96bf22fa5f3a5a704774c132da4925cc5db799c7f348a252a887431a",
    "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?w=826&t=st=1684236475~exp=1684237075~hmac=7acac1dca05cbd4b99696dc6b9fe7fa677f3de42dba06fce90a95e4328e01c1a",
    "https://img.freepik.com/free-psd/3d-illustration-bald-person_23-2149436183.jpg?w=826&t=st=1684236478~exp=1684237078~hmac=0f59f3382d9b1f0ba1330e7546924b8aa2fa4a7b5850236c486af128badaf807",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?w=740&t=st=1684236480~exp=1684237080~hmac=44b52924f4bdd7d372a7d8aa4b6df2056db7e6f081c1cd81b5eff4681c4bf463",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=826&t=st=1684236431~exp=1684237031~hmac=2f53d17b3322147784ccb4d7272876a3e39646b828b7dd049d7d3ec538faeb95"
]
//players array.
//containing inner scores array in this games order: tsvi's,netanel's,david's.
const players = getSavedPlayers();
let currentPlayerId = getSavedCurrentPlayerId();

function init() {
    drawScoreTable();
    drawCurrentPlayerWidget();
    localStorage.setItem("players", JSON.stringify(players))
    localStorage.setItem("currentPlayerId", JSON.stringify(currentPlayerId))
    setPopup();
}
init()

function getSavedPlayers() {
    const savedPlayers = JSON.parse(localStorage.getItem("players"));
    return savedPlayers || [
        {
            name: "yocheved",
            id: 0,
            avatarUrl: avatars[0],
            scores: [3, 5, 12]
        },
        {
            name: "jacob",
            id: 1,
            avatarUrl: avatars[1],
            scores: [1, 0, 5]
        },
        {
            name: "aric",
            id: 2,
            avatarUrl: avatars[2],
            scores: [5, 8, 2]
        },
        {
            name: "beni",
            id: 3,
            avatarUrl: avatars[3],
            scores: [5, 78, 43]
        },
        {
            name: "Obama",
            id: 4,
            avatarUrl: avatars[4],
            scores: [7, 4, 8]
        },
        {
            name: "Drakula",
            id: 5,
            avatarUrl: avatars[5],
            scores: [9, 67, 4]
        }
    ]
}

function getSavedCurrentPlayerId() {
    const savedCurrentPlayerId = JSON.parse(localStorage.getItem("currentPlayerId"));
    return savedCurrentPlayerId || 0;
}

function drawScoreTable() {

    const table = document.getElementById('scoresTable');

    //creating all the rows returning them as an array full of objects
    //every object is a row containing all the elements you need, excluding the rank:
    const newRows = players.map((player, index) => {
        const nameCell = document.createElement("td");
        nameCell.innerText = player.name;
        const tsviScore = document.createElement("td");
        tsviScore.innerText = player.scores[0];
        const netanelScore = document.createElement("td");
        netanelScore.innerText = player.scores[1];
        const davidScore = document.createElement("td");
        davidScore.innerText = player.scores[2];
        const sumScoreElement = document.createElement("td");
        const sumScore = player.scores.reduce((a, b) => a + b)
        sumScoreElement.innerText = sumScore;
        return { nameCell, tsviScore, netanelScore, davidScore, sumScoreElement, sumScore };
    });

    //sorting the new array acording to the sum of the scores:
    newRows.sort((a, b) => b.sumScore - a.sumScore);

    //creating the rank element for each row and pushing it to the DOM:
    newRows.forEach((v, i) => {
        const newRow = document.createElement("tr");
        table.appendChild(newRow);
        const rank = document.createElement("td");
        rank.innerText = i + 1;
        newRow.append(rank, v.nameCell, v.tsviScore, v.netanelScore, v.davidScore, v.sumScoreElement);
    })
}

function drawCurrentPlayerWidget() {
    const container = document.getElementById('currentPlayerWidget');
    const avatarElement = document.createElement('img');
    avatarElement.src = players[currentPlayerId].avatarUrl;
    const nameElement = document.createElement('h4');
    nameElement.innerText = players[currentPlayerId].name;
    const scoreElement = document.createElement('div');
    scoreElement.innerText = `score: ${players[currentPlayerId].scores.reduce((a, b) => a + b)}`;
    const PlayerDescriptionContainer = document.createElement('div');
    PlayerDescriptionContainer.id = 'PlayerDescriptionContainer';
    PlayerDescriptionContainer.append(nameElement, scoreElement);
    const switchPlayerButton = document.createElement('button');
    switchPlayerButton.innerHTML = `<i class="fa fa-exchange" aria-hidden="true"></i>`;
    switchPlayerButton.onclick = popPopup;
    container.append(avatarElement, PlayerDescriptionContainer, switchPlayerButton);
}

function setPopup() {
    const popupElement = document.getElementById('playerSelection');
    const playersElements = players.map(v => {
        const playerContainer = document.createElement('div');
        playerContainer.classList += 'choosePlayerButton';
        const playerImgElement = document.createElement('img');
        playerImgElement.src = v.avatarUrl;
        const playerNameElement = document.createElement('div');
        playerNameElement.innerText = v.name;
        playerContainer.append(playerImgElement, playerNameElement);
        playerContainer.onclick = () => {
            changeCurrentPlayerId(v.id)
            popupElement.style.display = 'none';
        }
        return playerContainer;
    })
    const exitButton = document.createElement('button');
    exitButton.onclick = () => { popupElement.style.display = 'none' };
    exitButton.id = 'popupExitButton';
    exitButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
    popupElement.append(...playersElements, exitButton);

}
function popPopup() {
    const popupElement = document.getElementById('playerSelection');
    popupElement.style.display = 'flex';
}

function updateCurrentPlayerWidget() {
    const avatarElement = document.querySelector('#currentPlayerWidget>img');
    avatarElement.src = players[currentPlayerId].avatarUrl;
    const nameElement = document.querySelector('#PlayerDescriptionContainer>h4');
    nameElement.innerText = players[currentPlayerId].name;
    const scoreElement = document.querySelector('#PlayerDescriptionContainer>div');
    scoreElement.innerText = `score: ${players[currentPlayerId].scores.reduce((a, b) => a + b)}`;
}

function changeCurrentPlayerId(newPlayerId) {
    currentPlayerId = newPlayerId;
    localStorage.setItem("currentPlayerId", JSON.stringify(currentPlayerId))
    updateCurrentPlayerWidget();
}

// this is the function you need to call in your game when the player win.
// its here just for reference.
// we can try to export it to all the games but I didn't tried it yet.
function countTheWin() {
    const players = JSON.parse(localStorage.getItem('players'));
    const currentPlayerId = JSON.parse(localStorage.getItem('currentPlayerId'));
    players[currentPlayerId].scores[myGameId] = players[currentPlayerId].scores[myGameId] + 1;
    localStorage.setItem('players', JSON.stringify(players));
}