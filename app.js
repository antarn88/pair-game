"use strict";

const time = document.querySelector(".time");
const checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"));
let startedGame = false;
let startingTime;


const gameData = {
    previousCardId: null,
    currentCardId: null,
    previousCardSymbol: null,
    currentCardSymbol: null,
    getPreviousCard () {
        return document.querySelector(this.previousCardId);
    },
    getCurrentCard () {
        return document.querySelector(this.currentCardId);
    }
};

const cardSymbolPairing = {
    freeIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    randomSymbolsArray: ["&#9749", "&#9889", "&#9924", "&#9981", "&#9962", "&#9749", "&#9889", "&#9924", "&#9981", "&#9962"],
    pairingObj : {},
    getRandomNumber() {
        const randomNumber = this.freeIndexes[Math.floor(Math.random() * this.freeIndexes.length)];
        const index = this.freeIndexes.indexOf(randomNumber);
        this.freeIndexes.splice(index, 1);
        return randomNumber;
    },
    pairing() {
        this.randomSymbolsArray.map((item, index) => this.pairingObj[index] = this.randomSymbolsArray[this.getRandomNumber()]);
    }
};

cardSymbolPairing.pairing();

checkboxes.map((item, index) => {
    item.addEventListener("click", () => {
        if (!startedGame) {
            startingTime = new Date().getTime();
            setTime();
            startedGame = true;
        }

        const isShown = item.checked;
        const card = item.nextElementSibling;
        gameData.previousCardSymbol = gameData.currentCardSymbol;
        gameData.previousCardId = gameData.currentCardId;

        isShown ? card.innerHTML = cardSymbolPairing.pairingObj[index] : card.textContent = "";
        if (isShown) {
            gameData.currentCardSymbol = card.textContent;
            gameData.currentCardId = card.getAttribute("id");

            if ((gameData.currentCardSymbol === gameData.previousCardSymbol) && (gameData.previousCardId !== gameData.currentCardId)) {
                console.log("Same symbol and different cards!");
            }
        } 
    });
});

const setTime = () => {
    setInterval(() => {
        const getTimeNow = new Date().getTime();
        let timeDiff = getTimeNow - startingTime;
        timeDiff = timeDiff / 1000;
        let seconds = Math.floor(timeDiff % 60);
        let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
        timeDiff = Math.floor(timeDiff / 60);
        let minutes = timeDiff % 60;
        let minutesAsString = minutes < 10 ? "0" + minutes : minutes;
        let totalTime = `${minutesAsString}:${secondsAsString}`;
        time.textContent = totalTime;
    }, 1000);
};
