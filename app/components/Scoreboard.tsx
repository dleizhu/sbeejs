interface ScoreboardProps {
  score: number;
}

export default function Scoreboard({ score }: ScoreboardProps) {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
}
