interface LetterProps {
  letter: string;
  color: 'primary' | 'secondary';
  clickFunction: (letter: string) => void;
}

export default function Letter({
  letter,
  color,
  clickFunction,
}: LetterProps): JSX.Element {
  const handleClick = () => {
    try {
      clickFunction(letter);
    } catch (error) {
      throw new Error(`error clicking button ${letter}`);
    }
  };

  const colorClass = color === 'secondary' ? 'btn-secondary' : 'btn-primary';

  return (
    <div className="flex bg-base-100 m-2">
      <button
        className={`btn btn-lg btn-square ${colorClass}`}
        onClick={handleClick}
      >
        {letter}
      </button>
    </div>
  );
}
