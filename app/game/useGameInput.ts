import { useState } from 'react';

export default function useGameInput() {
  const [inputValue, setInputValue] = useState('');

  const handleLetterClick = (letter: string) => {
    setInputValue((prevValue) => prevValue + letter);
  };

  const handleSubmit = () => {
    console.log('Input value:', inputValue);
  };

  return {
    inputValue,
    setInputValue,
    handleLetterClick,
    handleSubmit,
  };
}
