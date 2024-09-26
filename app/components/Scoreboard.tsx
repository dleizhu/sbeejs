import { useState, useEffect } from 'react';

interface ScoreboardProps {
  score: number;
  totalPossibleScore: number;
}

export default function Scoreboard({
  score,
  totalPossibleScore,
}: ScoreboardProps) {
  const [prevScore, setPrevScore] = useState(score);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    if (score > prevScore) {
      setIsIncreasing(true);
      const timer = setTimeout(() => setIsIncreasing(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevScore(score);
  }, [score, prevScore]);

  return (
    <div
      className={`card w-96 shadow-xl mb-8 transition-colors duration-300 bg-base-200`}
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl font-bold text-primary">Score</h2>
        <div className="stat-value text-5xl text-secondary">{score}</div>
        <p className="text-base-content opacity-70">Points</p>
        <div className="mt-4 w-full">
          <progress
            className="progress progress-primary w-full"
            value={score}
            max={totalPossibleScore}
          ></progress>
        </div>
        <p className="text-sm text-base-content opacity-70">
          {score} / {totalPossibleScore} possible points
        </p>
      </div>
    </div>
  );
}
