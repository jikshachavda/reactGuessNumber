import React, { useState } from "react";
import "./GuessNum.css";

const GuessNum = () => {
  const [gameArea, setGameArea] = useState("gameArea");
  const [welcomeScreen, setWelcomeScreen] = useState("Active");
  const [newGameButton, setnewGameButton] = useState("newGame");
  const [compreGuess, setComperGuess] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [random, setRandom] = useState("");
  const [count, setCount] = useState([]);
  const [guessCount, setGuessCount] = useState(1);
  const [maxGuess, setMaxGuess] = useState(0);

  const attempts = () => {
    setGameArea("Active");
    setWelcomeScreen("gameArea");
    setnewGameButton("newGame");
    setCount([]);
    setGuessCount(0);
    setTextOutput("");
    const ranNum = Math.floor(Math.random() * 100);
    setRandom(ranNum);
  };

  const easymode = () => {
    setMaxGuess(10);
    attempts();
  };

  const hardmode = () => {
    setMaxGuess(5);
    attempts();
  };

  const guessUpdate = (event) => {
    let guess = event.target.value;
    setComperGuess(guess);
  };

  const startNew = () => {
    setGameArea("gameArea");
    setWelcomeScreen("Active");
  };

  const guessCheck = () => {
    setCount((oldData) => [...oldData, compreGuess]);
    setGuessCount(count.length + 1);

    if (guessCount < maxGuess) {
      if (random > compreGuess) {
        setTextOutput("Your Guess is low 😑");
        setComperGuess("");
      } else if (random < compreGuess) {
        setTextOutput("Your Guess is High 😮");
        setComperGuess("");
      } else {
        setTextOutput("It's Correct 😄");
        setnewGameButton("newGameButton");
        setComperGuess("");
        setGuessCount(0);
        setCount([]);
      }
    }
    if (guessCount >= maxGuess) {
      setTextOutput(`You Lose !! Correct number was ${random}`);
      setnewGameButton("newGameButton");
      setComperGuess("");
    }
  };

  return (
    <>
      <main>
        <div id="welcomeScreen" className={welcomeScreen}>
          <h2>Guess the random number between 1-100</h2>
          <section className="eventSection">
            <p>Select The Difficulty</p>
            <div className="button-wrapper">
              <button onClick={easymode}>Easy: 10 attempts</button>
              <button onClick={hardmode}>Hard: 5 attempts</button>
            </div>
          </section>
        </div>
        <div id="gameArea" className={gameArea}>
          <div id={newGameButton}>
            <button onClick={startNew}>New Game</button>
          </div>

          <section>
            <h3 id="textOutPut">{textOutput}</h3>
            <div className="container">
              <input
                type="Number"
                id="inputBox"
                min="1"
                max="100"
                placeholder="Enter Your Number"
                name="compreGuess"
                value={compreGuess}
                onChange={guessUpdate}
              />
              <button onClick={guessCheck}>Check it</button>
            </div>
          </section>

          <section className="stats">
            <div className="info">
              <p>Number of previous attempts</p>
              <span id="attempts">{guessCount}</span>
            </div>
            <div className="info">
              <p>Number of previous Guesses</p>
              <span id="Guesses">{count.join(", ")}</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default GuessNum;
