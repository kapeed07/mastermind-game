import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import Replay from "./assets/img/replay.svg";
import Success from "./assets/img/success.svg";
import ThumbsDown from "./assets/img/thumbs-down.svg";

import { initailMoves, colorPallet, TOTAL_LEVELS } from "./constants";

function App() {
  const [moves, setMoves] = useState(initailMoves);
  const [active, setActive] = useState("red");
  const [level, setLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState("");
  const [solution, setSolution] = useState(["cyan", "cyan", "red", "red"]);

  const generateResult = (levelMoves, solution) => {
    const myAnswerSet = levelMoves.reduce((acc, e, i) => {
      return {
        ...acc,
        [e]: acc[e] ? acc[e] + 1 : 1
      };
    }, {});

    console.log(myAnswerSet);

    let missed = 0;
    let correct = 0;

    solution.forEach((el, i) => {
      if (el === levelMoves[i] && myAnswerSet[el] > 0) {
        correct++;
      } else if (myAnswerSet.hasOwnProperty(el) && myAnswerSet[el] > 0) {
        missed++;
      }
      myAnswerSet[el] = myAnswerSet[el] > 0 ? myAnswerSet[el] - 1 : 0;
    });

    let res = [-1, -1, -1, -1];
    let i = 0;

    while (correct--) {
      res[i++] = 1;
    }

    while (missed--) {
      res[i++] = 0;
    }

    const isCorrectSolution = res.every((v) => v === 1);

    if (isCorrectSolution) setGameStatus("win");
    if (!isCorrectSolution && level === TOTAL_LEVELS) setGameStatus("lose");

    const tempMoves = JSON.parse(JSON.stringify(moves));
    tempMoves[level - 1][4] = res;
    setMoves(tempMoves);
    setLevel(level + 1);
  };

  const getLevelHint = (level) => (
    <div className="level-hint">
      {level.map((m, i) => {
        if (m === 1) {
          return <div className="correct" />;
        } else if (m === 0) {
          return <div className="blank" />;
        } else {
          return <div className="cross" />;
        }
      })}
    </div>
  );

  const resetGame = () => {
    setMoves(JSON.parse(JSON.stringify(initailMoves)));
    setGameStatus("");
    setLevel(1);
    setActive("red");
    setSolution(
      Array(4)
        .fill(0)
        .map((c) => colorPallet[Math.floor(Math.random() * 6)])
    );
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="">
      <div className="app">
        {/* Header start */}
        <div className="flex-center text-42">
          <div className="spiral"></div>
          <span className="">Master</span>
          <span className="text-red">m</span>
          <span className="text-green">i</span>
          <span className="text-mahroon">n</span>
          <span className="text-yellow">d</span>
          <div className="spiral"></div>
        </div>
        {/* Header end */}

        {/* Game rules start */}
        <div className="text-14">
          <p className="mb-6">
             - So the game automatically selects 4 random colors (they can be all same, the can all be unique)
          </p>
          <p className="mb-6">
             - you are given 10 chances to guess the color code
          </p>
          <p className="mb-6">
             - when you fill a color row and click on check sign (✔️), it gives you a feedback
          </p>
          <p className="mb-6">
                - dark circle -> guessed the correct color and it is on the correct position too.
                - empty circle -> guessed the correct color but it is on the wrong position.
                - cross circle -> guessed the wrong correct.
          </p>
          <p className="mb-6">
            More info on{" "}
            <a
              className="text-purple"
              href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
            >
              Wikipedia.
            </a>
          </p>
        </div>
        {/* Game rules end */}

        <div className="mt-30 flex items-start">
          {/* color-pallet start */}
          <div className="color-pallet flex">
            {colorPallet.map((color, i) => (
              <div
                key={i}
                onClick={() => setActive(color)}
                className={`pallet bg-${color} ${
                  active === color ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
          {/* color-pallet end */}
          <div className="ml-60 flex flex-col">
            {/* solution start */}
            {gameStatus && (
              <div className="mt-4 mb-14 justify-center solution-pallet flex flex-col">
                <div className="flex justify-center">
                  {solution.map((color, i) => (
                    <div
                      key={i}
                      className={`pallet-solution bg-${color}`}
                    ></div>
                  ))}
                </div>
                <p className="text-14 flex justify-center mt-10">
                  codemaker's pattern
                </p>
              </div>
            )}
            {/* solution end */}

            {/* play-area start */}
            <div
              className={`pt-20 play-area ${!gameStatus ? "" : "event-none"}`}
            >
              {moves.map((move, i) => (
                <div
                  key={i}
                  className={`mb-14 flex items-center ${
                    i < level - 1 ? "opacity-75" : ""
                  }`}
                >
                  <div
                    className={`items-center flex-center ${
                      i !== level - 1 ? "event-none" : ""
                    }`}
                  >
                    {/* play-area--level-number start */}
                    <p
                      className={`level ml-10 mr-30 weight-700 ${
                        i === level - 1
                          ? "text-26 text-black"
                          : "text-16 text-grey"
                      }`}
                    >
                      {i + 1}
                    </p>
                    {/* play-area--level-number end */}

                    <div className="items-center flex-center">
                      {move.map(
                        (m, c) =>
                          c < 4 && (
                            <div
                              key={c}
                              onClick={() => {
                                const tempMoves = [...moves];
                                tempMoves[i][c] = active;
                                setMoves(tempMoves);
                              }}
                              className={`pallet bg-${m}`}
                            ></div>
                          )
                      )}
                    </div>
                  </div>

                  {/* play-area--result start */}
                  <div
                    key={i}
                    onClick={() =>
                      generateResult(moves[i].slice(0, 4), solution)
                    }
                    className="ml-20 cursor-pointer items-center flex"
                  >
                    {i === level - 1 &&
                      moves[i].slice(0, 4).every((c) => c !== "light-grey") && (
                        <span role="img" aria-label="check" className="flex">
                          ✔️
                        </span>
                      )}
                    {i < level &&
                      moves[i][4].length > 0 &&
                      getLevelHint(moves[i][4])}
                  </div>
                  {/* play-area--result end */}
                </div>
              ))}
            </div>
            {/* play-area end */}
          </div>

          {/* game-status start */}
          {gameStatus === "lose" && (
            <div>
              <img className="width-100" alt="ThumbsDown" src={ThumbsDown} />
              <p className="mt-10 ml-10 text-red weight-700">Game Over</p>
              <img
                onClick={resetGame}
                className="cursor-pointer ml-30 mt-20 width-40"
                alt="Replay"
                src={Replay}
              />
            </div>
          )}

          {gameStatus === "win" && (
            <div>
              <img className="width-100" alt="Success" src={Success} />
              <p className="mt-10 ml-10 text-green weight-700">You Won!!!</p>
              <img
                onClick={resetGame}
                className="cursor-pointer ml-30 mt-20 width-40"
                alt="Replay"
                src={Replay}
              />
            </div>
          )}
          {/* game-status end */}
        </div>
      </div>
    </div>
  );
}

export default App;
