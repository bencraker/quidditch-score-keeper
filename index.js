
let homeTeam = "";
let homeScore = 0;
let homeScoreEl = document.getElementById("home-score");

let awayTeam = "";
let awayScore = 0;
let awayScoreEl = document.getElementById("away-score");

let activeTeam = "";
let leadingTeam = "";
let leadingTeamEl = document.getElementById("leading-team");

let gameStatus = "";
let gameStatusEl = document.getElementById("game-status");

let historyEl = document.getElementById("history");

let timerEL = document.getElementById("timer");
let seconds = 0;
let interval = null;
let time = "";

// FUNCTIONS

// TIMER
function startTimer() {    
    interval = setInterval(function() {
        seconds++
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = (seconds % 60);
        time = minutes.toString().padStart(2, 0) + ":" + remainingSeconds.toString().padStart(2, 0);
        timerEL.textContent = time;
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval)
}


// ACTIVE TEAM
function setHomeTeam(team) {
    if(awayTeam == team) return;
    homeTeam = team
    document.getElementById('home-team').innerText = team
}

function setAwayTeam(team) {
    if(homeTeam == team) return;
    awayTeam = team
    document.getElementById('away-team').innerText = team
}

// GAME STATES

function startGame() {
    if (homeTeam == "" || awayTeam == "") return;
    gameStatus = "In play...";
    gameStatusEl.textContent = gameStatus;
    historyEl.innerHTML = "00:00 - Game Started<br>";
    startTimer();
}

function pauseGame() {
    if (gameStatus !== "In play..." ) return;
    gameStatus = "Paused";
    gameStatusEl.textContent = gameStatus;
    historyEl.innerHTML = time + " - Game Paused" + "<br>" + historyEl.innerHTML;
    pauseTimer();
}

function endGame() {
    if (gameStatus !== "In play..." ) return;
    gameStatus = "Game Over";
    gameStatusEl.textContent = gameStatus;
    historyEl.innerHTML = time + " - Game Over" + historyEl.innerHTML;
    pauseTimer()
}

function restartGame() {
    homeScore = 0;
    homeScoreEl.textContent = "000";
    awayScore = 0;
    awayScoreEl.textContent = "000";
    gameStatus = "Pending...";
    gameStatusEl.textContent = gameStatus
    historyEl.innerHTML = "...";
    activeTeam = ""
    homeTeam = ""
    document.getElementById('home-team').innerText = "select a team"
    awayTeam = ""
    document.getElementById('away-team').innerText = "select a team"
    leadingTeamEl.textContent = "TIE";
    pauseTimer();
    seconds = 0
    timerEL.textContent = "00:00";

}

    
// ADD & REMOVE POINTS

function addPoints(team, value) {

    //Check, game is in play
    if (gameStatus !== "In play...") return; 

    //Add points
    switch (team) {
        case 'home':
            if (homeScore + value < 0) return;
            activeTeam = homeTeam;
            homeScore += value;
            homeScoreEl.textContent = homeScore.toString().padStart(3, "0");
        break;

        case 'away':
            if (awayScore + value < 0) return;
            activeTeam = awayTeam;
            awayScore += value;
            awayScoreEl.textContent = awayScore.toString().padStart(3, "0");
        break;
    }; 

    //Record to History
    if (value === 150) {
        gameStatus = "Game Over";
        gameStatusEl.textContent = gameStatus
        historyEl.innerHTML = time + " - " + activeTeam.slice(0, 3) + " caught the Golden Snitch and won the game!<br>" + historyEl.innerHTML
        clearInterval(interval);
    
    } else if (value > 0 ) {
        historyEl.innerHTML = time + " - " + activeTeam.slice(0, 3) + " scored " + value + " points.<br>" + historyEl.innerHTML;
    } else{
        historyEl.innerHTML = time + " - " + activeTeam.slice(0, 3) + " was fouled " + value + " points.<br>" + historyEl.innerHTML;
    }

    //Set leading team 
    if (homeScore > awayScore) {
        leadingTeamEl.innerText = homeTeam
    } else if (awayScore > homeScore) {
        leadingTeamEl.innerText = awayTeam
    } else {
        leadingTeamEl.innerText = "TIE"
    }
};