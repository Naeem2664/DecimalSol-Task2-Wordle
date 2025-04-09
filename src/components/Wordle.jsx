import React, { useState, useEffect } from 'react';
import '../styles/Wordle.css';

const WORD_LIST = ['apple', 'grape', 'peach', 'berry'];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const Wordle = () => {
  const [word, setWord] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
    setWord(randomWord);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= WORD_LENGTH) {
      setCurrentAttempt(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAttempt.length === WORD_LENGTH) {
      if (currentAttempt === word) {
        setMessage('Congratulations! You guessed the word!');
        setIsGameOver(true);
      } else {
        setAttempts([...attempts, currentAttempt]);
        setCurrentAttempt('');
        if (attempts.length + 1 === MAX_ATTEMPTS) {
          setMessage(`Game Over! The word was "${word}".`);
          setIsGameOver(true);
        }
      }
    }
  };

  const getLetterClass = (letter, index) => {
    if (letter === word[index]) {
      return 'correct'; 
    } else if (word.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  return (
    <div className="wordle">
      <h1>Wordle Game</h1>
      <div className="attempts">
        {attempts.map((attempt, index) => (
          <div key={index} className="attempt">
            {attempt.split('').map((letter, i) => (
              <span key={i} className={`letter ${getLetterClass(letter, i)}`}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentAttempt}
          onChange={handleInputChange}
          disabled={isGameOver}
          maxLength={WORD_LENGTH}
        />
        <button type="submit" disabled={isGameOver}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Wordle;