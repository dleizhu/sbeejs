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
  const [gamePuzzle, setGamePuzzle] = useState<GamePuzzle | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submittedWords, setSubmittedWords] = useState(new Set());
  const [inputValue, setInputValue] = useState<string>('');
  const [totalPossibleScore, setTotalPossibleScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleLetterClick = (letter: string) => {
    setInputValue((prevValue) => prevValue + letter);
  };

  const calculateWordScore = (word: string, isPangram: boolean) => {
    if (word.length < 4) return 0;
    return isPangram ? word.length + 7 : word.length;
  };

  const handleSubmit = () => {
    console.log(`submitted ${inputValue}`);
    if (gamePuzzle) {
      if (submittedWords.has(inputValue)) {
        setMessage(`${inputValue} has already been submitted`);
      } else {
        const solution = gamePuzzle.solutions.find(
          (s) => s.word === inputValue
        );
        if (solution) {
          setSubmittedWords((prev) => new Set(prev).add(inputValue));
          const wordScore = calculateWordScore(
            solution.word,
            solution.isPangram
          );
          setScore((prevScore) => prevScore + wordScore);
          setMessage(''); // Clear any previous message
        } else {
          setMessage(`${inputValue} is not a valid word`);
        }
      }
    }
    setInputValue(''); // Clear the input box after submission
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const storedPuzzle = sessionStorage.getItem('gamePuzzle');
    if (storedPuzzle) {
      try {
        const puzzle = JSON.parse(storedPuzzle);
        setGamePuzzle(puzzle);
        const totalScore = puzzle.solutions.reduce(
          (total: number, solution: { word: string; isPangram: boolean }) => {
            return (
              total + calculateWordScore(solution.word, solution.isPangram)
            );
          },
          0
        );
        console.log(`total possible score = ${totalPossibleScore}`);
        setTotalPossibleScore(totalScore);
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
      <Scoreboard score={score} totalPossibleScore={totalPossibleScore} />
      {message && <div className="text-error m-0 p-0">{message}</div>}
      <GameInput
        gamePuzzle={gamePuzzle}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleLetterClick={handleLetterClick}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
