import React, { useEffect, useState } from 'react';
import './app.scss';
import Check from './check.svg';
import Replay from './replay.svg';
import Success from './success.svg';
import ThumbsDown from './thumbs-down.svg';

const initailMoves = [
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
  ['light-grey', 'light-grey', 'light-grey', 'light-grey', []],
]

function App() {
  const [moves, setMoves] = useState(initailMoves);

  const [active, setActive] = useState('red')
  const [level, setLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState('');

  const colorPallet = ['red', 'yellow', 'purple', 'cyan', 'dark-green', 'mahroon'];
  const [solution, setSolution] = useState(["cyan", "yellow", "purple", "red"]);

  const generateResult = (levelMoves, solution) => {
    const solutionSet = {};
    solution.forEach(s => {
      if (solutionSet[s]) {
        solutionSet[s]++;
      } else {
        solutionSet[s] = 1;
      }
    });
    
    
    const res = levelMoves.map((m, i) => {
      if (solution[i] === m) {
        solutionSet[m]--;
        return 1
      } else if (solutionSet.hasOwnProperty(m) && solutionSet[m] > 0) {
        solutionSet[m]--;
        return 0
      } else {
        return -1
      }
    })
    if (res.every(state => state === 1)) {
      setGameStatus('win')
    }
    if (level === 10) {
      setGameStatus('lose')
    }
    const tempMoves = JSON.parse(JSON.stringify(moves));
    tempMoves[level - 1][4] = res;
    setMoves(tempMoves)
    setLevel(level + 1)
  }

  const getLevelHint = (level) => {
    return <div className="level-hint">{level.map((m, i) => {
      if (m === 1) {
        return <div className="correct" />
      } else if (m === 0) {
        return <div className="blank" />
      } else {
        return <div className="cross" />
      }
    })}</div>
  }
  const resetGame = () => {
    setMoves(JSON.parse(JSON.stringify(initailMoves)))
    setGameStatus('');
    setLevel(1);
    setActive('red')
    setSolution(Array(4).fill(0).map(c => colorPallet[Math.floor(Math.random() * 6)]))
  }

  useEffect(() => {
    resetGame();
  }, [])

  return (
    <div className="">
      <div className="app">
        <div className="flex-center text-42">
          <div className="spiral"></div>
          <span className="">Master</span>
          <span className="text-red">m</span>
          <span className="text-green">i</span>
          <span className="text-mahroon">n</span>
          <span className="text-yellow">d</span>
          <div className="spiral"></div>
        </div>
        <div className="text-14">
          <p className="mb-6">Try to guess the pattern, in both order and color, within ten turns.</p>
          <p className="mb-6">After submitting a row, a small black peg is placed for each code peg from the guess which is correct in both color and position.</p>
          <p className="mb-6">A white peg indicates the existence of a correct color code peg placed in the wrong position. More info on <a className="text-purple" href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Wikipedia.</a></p>
        </div>
        <div className="mt-30 flex items-start">
          <div className="color-pallet flex">
            {colorPallet.map((color, i) =><div key={i} onClick={() => setActive(color)} className={`pallet bg-${color} ${active === color ? 'active' : ''}`}></div> )}
          </div>

          <div className={`ml-60 pt-20 play-area ${!gameStatus ? '' : 'event-none'}`}>
            {moves.map((move, i) => <div key={i} className="flex">
              <div className={`mb-14 items-center flex-center ${i !== level - 1 ? 'event-none' : ''}`}>
                <p className="level ml-10 mr-30 weight-700 text-22 text-grey">{i + 1}</p>
                <div className="items-center flex-center">
                  {move.map((m, c) => c < 4 && <div
                    key={c}
                    onClick={() => {
                      const tempMoves = [...moves];
                      tempMoves[i][c] = active;
                      setMoves(tempMoves)
                    }}
                    className={`pallet bg-${m}`}></div>)}
                  </div>
                </div>
                <div key={i} onClick={() => generateResult(moves[i].slice(0, 4), solution)} className="ml-20 cursor-pointer items-center flex">
                  {i === level - 1 && moves[i].slice(0, 4).every(c => c !== 'light-grey') && <img className="width-20" alt="Check" src={Check} />}
                  {i < level && moves[i][4].length > 0 && getLevelHint(moves[i][4])}
                </div>
              </div>
            )}
          </div>

          
          {gameStatus === 'lose' && <div>
            <img className="width-100" alt="ThumbsDown" src={ThumbsDown} />
            <p className="mt-10 ml-10 text-red weight-700">Game Over</p>
            <img onClick={resetGame} className="cursor-pointer ml-30 mt-20 width-40" alt="Replay" src={Replay} />
          </div>}
          {gameStatus === 'win' && <div>
            <img className="width-100" alt="Success" src={Success} />
            <p className="mt-10 ml-10 text-green weight-700">You Won!!!</p>
            <img onClick={resetGame} className="cursor-pointer ml-30 mt-20 width-40" alt="Replay" src={Replay} />
          </div>}
          
        </div>
      </div>
    </div>
  );
}

export default App;
