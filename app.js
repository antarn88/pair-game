"use strict";

const time = document.querySelector(".time");
const startingTime = new Date().getTime();

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

setTime();
