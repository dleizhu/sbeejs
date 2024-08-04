interface LetterProps {
  letter: string;
  color: string;
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

  return (
    <div className="flex bg-base-100 m-2">
      <button
        className={`btn btn-lg btn-square btn-${color}`}
        onClick={handleClick}
      >
        {letter}
      </button>
    </div>
  );
}
