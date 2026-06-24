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

  const numberWords = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
    '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
    '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten'
  };

  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  }

  function isCorrectGuess(guess, answer) {
    const g = normalize(guess);
    const a = normalize(answer);

    if (g === a) return true;
    if (a.includes(g) && g.length > 2) return true;
    if (numberWords[g] && (numberWords[g] === a || a.includes(numberWords[g]))) return true;

    return false;
  }

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
    const correct = isCorrectGuess(guess, currentCard.answer);
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
          <p style={{ color: '#1a1a1a' }}>{isFlipped ? currentCard.answer : currentCard.question}</p>
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
            style={{
              borderColor: guessResult === 'correct' ? '#4caf50' : guessResult === 'incorrect' ? '#f44336' : '#ccc',
              backgroundColor: guessResult === 'correct' ? '#f0fff0' : guessResult === 'incorrect' ? '#fff0f0' : 'white',
              color: '#1a1a1a'
            }}
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
