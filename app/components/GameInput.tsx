import { useState } from 'react';
import { GamePuzzle } from '../game/page';
import LettersRow from './LettersRow';

interface GameInputProps {
  gamePuzzle: GamePuzzle;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleLetterClick: (letter: string) => void;
  handleSubmit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function GameInput({
  gamePuzzle,
  inputValue,
  setInputValue,
  handleLetterClick,
  handleSubmit,
  handleKeyDown,
}: GameInputProps): JSX.Element {
  return (
    <div className="flex flex-col bg-base-100 items-center px-2">
      <div className="flex flex-row bg-base-100 items-center w-full">
        <input
          type="text"
          placeholder="Type here or click letters"
          className="input input-bordered flex-grow m-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-accent m-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <LettersRow
        letters={gamePuzzle.letters}
        handleClick={handleLetterClick}
      />
    </div>
  );
}
