import Letter from './Letter';

interface LettersRowProps {
  letters: Array<string>;
  handleClick: (letter: string) => void;
}

export default function LettersRow({ letters, handleClick }: LettersRowProps) {
  return (
    <div className="flex flex-wrap justify-center bg-base-100">
      {/* first letter is mandatory */}
      <Letter
        key={0}
        letter={letters[0]}
        color="secondary"
        clickFunction={handleClick}
      />
      {letters.slice(1).map((letter, index) => {
        return (
          <Letter
            key={index + 1}
            letter={letter}
            color="primary"
            clickFunction={handleClick}
          />
        );
      })}
    </div>
  );
}
