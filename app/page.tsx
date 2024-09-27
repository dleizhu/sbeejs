'use client';

import { useState } from 'react';
import DatePicker from './components/DatePicker';
import { useRouter } from 'next/navigation';

const FIRSTPUZZLEDATE = new Date('2018-05-09');
const NUMMSINADAY = 1000 * 60 * 60 * 24;

function convertDateToPuzzleNumber(dateStr: string) {
  const puzzleDate = new Date(dateStr);
  return (
    Math.round(
      (puzzleDate.getTime() - FIRSTPUZZLEDATE.getTime()) / NUMMSINADAY
    ) + 1
  );
}

async function getPuzzle(puzzleNum: number) {
  // call API to get puzzle letters and solutions
  const response = await fetch(`/api/getSolutions?puzzleNum=${puzzleNum}`);
  if (!response.ok) {
    throw new Error('Failed to fetch solutions');
  }
  const { letters, solutions } = await response.json();

  return { letters, solutions };
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const processDate = async (date: string) => {
    setIsLoading(true);
    try {
      const puzzleNum = convertDateToPuzzleNumber(date);
      const puzzle = await getPuzzle(puzzleNum);

      console.log(puzzle);

      // store solutions in sessionStorage
      sessionStorage.setItem('gamePuzzle', JSON.stringify(puzzle));

      // redirect to game page
      router.push(`/game?date=${date}`);
    } catch (error) {
      console.error(
        `Error processing date: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 p-4">
      <div className="relative">
        <DatePicker
          title="Choose your puzzle date!"
          submitFunction={processDate}
        />
        {isLoading && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center">
            <p className="mt-2 text-lg">loading puzzle</p>
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
      </div>
    </div>
  );
}
