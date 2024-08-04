'use client';

import { useEffect, useState } from 'react';
import LettersRow from '../components/LettersRow';
import GameInput from '../components/GameInput';

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

  if (!gamePuzzle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <GameInput gamePuzzle={gamePuzzle} />
    </div>
  );
}
