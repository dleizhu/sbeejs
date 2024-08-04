'use client';

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

  const processDate = async (date: string) => {
    try {
      const puzzleNum = convertDateToPuzzleNumber(date);
      const puzzle = await getPuzzle(puzzleNum);

      console.log(puzzle);

      // store solutions in sessionStorage
      sessionStorage.setItem('gamePuzzle', JSON.stringify(puzzle));

      // redirect to game page
      router.push(`/game?date=${date}`);
    } catch (error) {
      throw new Error(`error processing date ${date}`);
    }
  };

  return (
    <div
      id="main-container"
      className="flex justify-center items-center h-screen bg-base-100"
    >
      <DatePicker
        title="Choose your puzzle date!"
        submitFunction={processDate}
      ></DatePicker>
    </div>
  );
}
