'use client';

import { FormEvent, useEffect, useState } from 'react';

interface DatePickerProps {
  title?: string;
  submitFunction: (date: string) => Promise<void>;
}

export default function DatePicker({
  title,
  submitFunction,
}: DatePickerProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // validate submitted date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(selectedDate);

    if (!selectedDate || selected > today) {
      setError('Please select a valid date!');
    } else {
      setError('');
      console.log('Selected date:', selectedDate);
      // run submitFunction
      try {
        await submitFunction(selectedDate);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
      }
    }
  };

  // clear error when date is changed
  useEffect(() => {
    setError('');
  }, [selectedDate]);

  return (
    <div className="card bg-neutral shadow-xl items-center justify-center">
      <div className="card-body flex flex-col items-center">
        {title && <h2 className="card-title">{title}</h2>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="date"
            className="input bg-base-300 m-2"
            value={selectedDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedDate(e.target.value)
            }
          />
          {error && <p className="text-secondary">{error}</p>}
          <div className="card-actions">
            <button type="submit" className="btn btn-primary m-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
