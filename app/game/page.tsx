'use client';

import { useEffect, useState } from 'react';
import LettersRow from '../components/LettersRow';
import GameInput from '../components/GameInput';
import useGameInput from './useGameInput';

export interface GamePuzzle {
  letters: string[];
  solutions: { word: string; isPangram: boolean }[];
}

export default function Page() {
  // get letters and solutions from session storage
  const [gamePuzzle, setGamePuzzle] = useState<GamePuzzle | null>(null);
  useEffect(() => {
    const storedPuzzle = sessionStorage.getItem('gamePuzzle');
    if (storedPuzzle) {
      try {
        setGamePuzzle(JSON.parse(storedPuzzle));
      } catch (error) {
        console.error('Failed to parse game puzzle from sessionStorage', error);
      }
    }
  }, []);

  const { inputValue, setInputValue, handleLetterClick, handleSubmit } =
    useGameInput();

  if (!gamePuzzle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <GameInput
        gamePuzzle={gamePuzzle}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleLetterClick={handleLetterClick}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
