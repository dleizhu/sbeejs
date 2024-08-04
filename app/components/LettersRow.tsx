import Letter from './Letter';

interface LettersRowProps {
  letters: Array<string>;
}

export default function LettersRow({ letters }: LettersRowProps) {
  return (
    <div className="flex flex-wrap justify-center bg-base-100">
      {/* first letter is mandatory */}
      <Letter
        key={0}
        letter={letters[0]}
        color="secondary"
        clickFunction={(letter) => console.log(`clicked ${letter}`)}
      />
      {letters.slice(1).map((letter, index) => {
        return (
          <Letter
            key={index + 1}
            letter={letter}
            color="primary"
            clickFunction={(letter) => console.log(`clicked ${letter}`)}
          />
        );
      })}
    </div>
  );
}
