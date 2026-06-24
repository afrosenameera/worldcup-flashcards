import { useState } from 'react';
import { title, description, flashcards } from './data';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [guessResult, setGuessResult] = useState(null);
  const [deck, setDeck] = useState([...flashcards]);

  const currentCard = deck[currentIndex];

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleNext() {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setGuess('');
      setGuessResult(null);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setGuess('');
      setGuessResult(null);
    }
  }

  function handleGuessSubmit() {
    if (!guess.trim()) return;
    const correct = guess.trim().toLowerCase() === currentCard.answer.trim().toLowerCase();
    setGuessResult(correct ? 'correct' : 'incorrect');
  }

  function handleShuffle() {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setGuess('');
    setGuessResult(null);
  }

  return (
    <div className="app">
      <div className="quiz-box">
        <h1>{title}</h1>
        <p className="description">{description}</p>
        <p className="count">Card {currentIndex + 1} of {deck.length}</p>

        <div className="card" onClick={handleFlip}>
          <p>{isFlipped ? currentCard.answer : currentCard.question}</p>
          <span className="flip-hint">Click to flip</span>
        </div>

        <div className="guess-section">
          <input
            type="text"
            placeholder="Type your answer here..."
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setGuessResult(null);
            }}
            className={guessResult === 'correct' ? 'input-correct' : guessResult === 'incorrect' ? 'input-incorrect' : ''}
          />
          <button className="submit-btn" onClick={handleGuessSubmit}>Submit</button>
        </div>

        {guessResult === 'correct' && (
          <p className="feedback correct"> Correct!</p>
        )}
        {guessResult === 'incorrect' && (
          <p className="feedback incorrect"> Incorrect! Try again or flip the card.</p>
        )}

        <div className="controls">
          <button onClick={handleBack} disabled={currentIndex === 0}>← Back</button>
          <button onClick={handleShuffle}>🔀 Shuffle</button>
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleNext} disabled={currentIndex === deck.length - 1}>Next →</button>
        </div>
      </div>
    </div>
  );
}

export default App;
