'use client';

import { useEffect, useState } from 'react';
import LettersRow from '../components/LettersRow';
import GameInput from '../components/GameInput';
import useGameInput from './useGameInput';
import Scoreboard from '../components/Scoreboard';

export interface GamePuzzle {
  letters: string[];
  solutions: { word: string; isPangram: boolean }[];
}

export default function Page() {
  // get letters and solutions from session storage
  const [gamePuzzle, setGamePuzzle] = useState<GamePuzzle | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submittedWords, setSubmittedWords] = useState(new Set());
  const [inputValue, setInputValue] = useState<string>('');

  const handleLetterClick = (letter: string) => {
    setInputValue((prevValue) => prevValue + letter);
  };

  const handleSubmit = () => {
    console.log(`submitted ${inputValue}`);
    if (gamePuzzle && !submittedWords.has(inputValue)) {
      const solution = gamePuzzle.solutions.find((s) => s.word === inputValue);
      if (solution) {
        setSubmittedWords((prev) => new Set(prev).add(inputValue));
        const wordScore = solution.isPangram
          ? inputValue.length + 7
          : inputValue.length;
        setScore((prevScore) => prevScore + wordScore);
      }
    }
  };

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

  if (!gamePuzzle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100">
      <Scoreboard score={score} />
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
