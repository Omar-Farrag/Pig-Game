"use strict";
////////////////////////////////////////////////////INITIALIZATION////////////////////////////////////////////////////

//Player Sections
const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");

//Total Score Elements: accumulated sum from beginning of the game
const totalScore1El = document.querySelector("#score--0");
const totalScore2El = document.querySelector("#score--1");

//Current Score Elements: running sum in between holds
const currentScore1El = document.querySelector("#current--0");
const currentScore2El = document.querySelector("#current--1");

//New Game Button
const newGameBtn = document.querySelector(".btn--new");

//Displayed Die Image
const diceIMG = document.querySelector(".dice");

//Buttons
const rollDiceBtn = document.querySelector(".btn--roll");
const holdDiceBtn = document.querySelector(".btn--hold");

//Scores and current player turn
let totalScores, currentScores, turn;

//Resets the game to initial conditions
function initialize() {
	//The first 0 in totalScores and currentScores allows for 1-based indexing
	totalScores = [0, 0, 0];
	currentScores = [0, 0, 0];

	//By default, player 1 starts
	turn = 1;

	updateDisplayedCurrentScores();
	updateDisplayedTotalScores();
	displayDieIMG();

	player1El.classList.remove("player--winner");
	player1El.classList.add("player--active");
	player2El.classList.remove("player--winner");
	player2El.classList.remove("player--active");
}

////////////////////////////////////////////////////UI DISPLAYS////////////////////////////////////////////////////

//Displays the current score on UI
function updateDisplayedCurrentScores() {
	currentScore1El.textContent = currentScores[1];
	currentScore2El.textContent = currentScores[2];
}

//Displays the total score on UI
function updateDisplayedTotalScores() {
	totalScore1El.textContent = totalScores[1];
	totalScore2El.textContent = totalScores[2];
}

//Displays on the UI which player won the game
function displayGameResults() {
	if (turn === 1) player1El.classList.add("player--winner");
	else player2El.classList.add("player--winner");
	diceIMG.style.display = "none";
}

//Diplays die img matching the face value of the rolled die
//If an invalid number is passed or no value was passed, image is hidden
function displayDieIMG(number = 0) {
	if (number < 1 || number > 6) diceIMG.style.display = "none";
	else {
		diceIMG.src = `dice-${number}.png`;
		diceIMG.style.display = "block";
	}
}

////////////////////////////////////////////////////EVENT HANDLERS////////////////////////////////////////////////////

//Handles Dice Rolling
function handleRolledDice() {
	//Returns if the player tries rolling the die after the game has ended
	if (gameEnded()) return;

	//Random number from 1 - 6 generated for the die and the corresponding image is displayed
	const randomNumber = Math.trunc(Math.random() * 6 + 1);
	displayDieIMG(randomNumber);

	//Player's loses current score and turn whenever die's face value is 1
	if (randomNumber === 1) {
		currentScores[turn] = 0;
		updateDisplayedCurrentScores();
		switchPlayers();
		return;
	}

	currentScores[turn] += randomNumber;
	updateDisplayedCurrentScores();
}

//Handles Dice Holding
function handleHoldDice() {
	//Returns if the player tries holding after the game has ended
	if (gameEnded()) return;

	//Updates the total score and resets current score for current player
	totalScores[turn] += currentScores[turn];
	currentScores[turn] = 0;

	updateDisplayedCurrentScores();
	updateDisplayedTotalScores();

	if (gameEnded()) displayGameResults();
	else switchPlayers();
}

////////////////////////////////////////////////////Program Execution////////////////////////////////////////////////////

//Checks if game has ended
function gameEnded() {
	return totalScores[turn] >= 100;
}

//Switches between player 1 and 2;
function switchPlayers() {
	turn = turn === 1 ? 2 : 1;
	player1El.classList.toggle("player--active");
	player2El.classList.toggle("player--active");
}

initialize();
rollDiceBtn.addEventListener("click", handleRolledDice);
holdDiceBtn.addEventListener("click", handleHoldDice);
newGameBtn.addEventListener("click", initialize);
