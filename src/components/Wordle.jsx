import React, { useState, useEffect } from 'react';
import '../styles/Wordle.css';

const WORD_LIST = ['apple', 'grape', 'peach', 'berry','melon','lemon','mango'];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const Wordle = () => {
  const [word, setWord] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('red');

  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
    setWord(randomWord);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    const letterOnly = value.replace(/[^a-zA-Z]/g, '');
    if (letterOnly.length <= WORD_LENGTH) {
      setCurrentAttempt(letterOnly);
      if(letterOnly=='' || /^[a-zA-Z]+$/.test(letterOnly) && /^[a-zA-Z]+$/){
        setMessage('');
      }
      else{
        setMessage('Please enter only letters');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAttempt.length === WORD_LENGTH) {
      if (currentAttempt === word) {
        setMessage(`Congratulations! You guessed the ${word} correctly!`);
        setIsGameOver(true);
        setBgColor('green');

      } else {
        setAttempts([...attempts, currentAttempt]);
        setCurrentAttempt('');
        if (attempts.length + 1 === MAX_ATTEMPTS) {
          setMessage(`Game Over! The word was "${word}".`);
          setIsGameOver(true);
          setBgColor('red');
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
        <label htmlFor="guess" style={{color: 'red',marginBottom: '10px',display: 'block'}}>Enter your guess:Only letters</label>
        <input
          type="text"
          value={currentAttempt}
          onChange={handleInputChange}
          disabled={isGameOver}
          maxLength={WORD_LENGTH}
        />
        <button type="submit" disabled={isGameOver}>Check Word</button>
      </form>
      {message && <p>{message}</p>}
      {isGameOver &&(
        <button onClick={() => window.location.reload()} style={{background
        : `${bgColor}`, color: 'white', padding: '10px', border: 'none', borderRadius: '5px'
        }}>Play Again</button>)
      }
    <p style={{color: 'red',marginTop: '10px'}}>Word Length: {WORD_LENGTH}</p>
    <p>Total Attempts {MAX_ATTEMPTS}</p>
      <p>Remaining Attempts: {MAX_ATTEMPTS - attempts.length}</p>
    </div>
  );
};

export default Wordle;