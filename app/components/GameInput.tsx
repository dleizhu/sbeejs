import { GamePuzzle } from '../game/page';
import LettersRow from './LettersRow';

interface GameInputProps {
  gamePuzzle: GamePuzzle;
}

export default function GameInput({ gamePuzzle }: GameInputProps): JSX.Element {
  return (
    <div className="flex flex-col bg-base-100 items-center px-2">
      <div className="flex flex-row bg-base-100 items-center w-full">
        <input
          type="text"
          placeholder="Type here or click letters"
          className="input input-bordered flex-grow m-2"
        />
        <button className="btn btn-accent m-2">Submit</button>
      </div>

      <LettersRow letters={gamePuzzle.letters} />
    </div>
  );
}
