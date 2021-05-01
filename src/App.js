import React, { useState } from 'react';
import './app.scss';
import Success from './success.svg';
import GameOver from './game-over.svg';
import ThumbsDown from './thumbs-down.svg';
import Replay from './replay.svg';

function App() {
  const [moves, setMoves] = useState([
    ['red', 'cyan', 'yellow', 'green'],
    ['red', 'red', 'red', 'red'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
    ['light-grey', 'light-grey', 'light-grey', 'light-grey'],
  ]);

  const [active, setActive] = useState('red')
  const colorPallet = ['red', 'yellow', 'purple', 'cyan', 'dark-green', 'mahroon'];
  const solution = ['red', 'yellow', 'red', 'yellow'];

  const getResult = (moves, solution) => {
    const solutionSet = new Set(solution);
    return <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>{moves.map((m, i) => {
      if (solution[i] === m) {
        return <div className="correct" />
      } else if (solutionSet.has(m)) {
        return <div className="blank" />
      } else {
        return <div className="cross" />
      }
    })}</div>
  }
  return (
    <div className="">
      <div className="app">
        <p className="flex-center text-42">
          <div className="spiral"></div>
          <span className="">Master</span>
          <span className="text-red">m</span>
          <span className="text-green">i</span>
          <span className="text-mahroon">n</span>
          <span className="text-yellow">d</span>
          <div className="spiral"></div>
        </p>
        <div className="text-14">
          <p className="mb-6">Try to guess the pattern, in both order and color, within ten turns.</p>
          <p className="mb-6">After submitting a row, a small black peg is placed for each code peg from the guess which is correct in both color and position.</p>
          <p className="mb-6">A white peg indicates the existence of a correct color code peg placed in the wrong position. More info on <a className="text-purple" href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Wikipedia.</a></p>
        </div>
        {/* <img className="width-100" src={GameOver} /> */}
        <div className="mt-30 flex items-start">
          <div className="color-pallet flex">
            {colorPallet.map(color =><div onClick={() => setActive(color)} className={`pallet bg-${color} ${active === color ? 'active' : ''}`}></div> )}
          </div>

          <div className="ml-60 play-area">
            {moves.map((move, i) => <div className="flex">
              <div className="flex-center">
                {/* <p className="mr-10 weight-700 text-22 text-grey">{i + 1}</p> */}
                
                  {move.map((m, c) => <div
                    onClick={() => {
                      const tempMoves = [...moves];
                      tempMoves[i][c] = active;
                      setMoves(tempMoves)
                    }}
                    className={`pallet bg-${m}`}></div>)}
                  </div>
                
                <div className="ml-40 flex">
                  {getResult(moves[i], solution)}
                </div>
              </div>
            )}
          </div>

          
          {/* <div>
            <img className="width-100" src={ThumbsDown} />
            <p className="mt-10 ml-10 text-red weight-700">Game Over</p>
            <img className="ml-30 mt-20 width-40" src={Replay} />
          </div> */}
          {/* <div>
            <img className="width-100" src={Success} />
            <p className="mt-10 ml-10 text-green weight-700">You Won!!!</p>
            <img className="ml-30 mt-20 width-40" src={Replay} />
          </div> */}
          
        </div>
      </div>
    </div>
  );
}

export default App;
