import { useState } from 'react';
import { title, description, flashcards } from './data';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [history, setHistory] = useState([0]);
  const [historyPos, setHistoryPos] = useState(0);

  const currentCard = flashcards[currentIndex];

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleNext() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (randomIndex === currentIndex && flashcards.length > 1);

    const newHistory = [...history.slice(0, historyPos + 1), randomIndex];
    setHistory(newHistory);
    setHistoryPos(newHistory.length - 1);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  }

  function handleBack() {
    if (historyPos === 0) return;
    const newPos = historyPos - 1;
    setHistoryPos(newPos);
    setCurrentIndex(history[newPos]);
    setIsFlipped(false);
  }

  return (
    <div className="app">
      <div className="quiz-box">
        <h1>{title}</h1>
        <p className="description">{description}</p>
        <p className="count">Number of cards: {flashcards.length}</p>

        <div className="card" onClick={handleFlip}>
          <p>{isFlipped ? currentCard.answer : currentCard.question}</p>
          <span className="flip-hint">Click to flip</span>
        </div>

        <div className="controls">
          <button onClick={handleBack} disabled={historyPos === 0}>←</button>
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleNext}>→</button>
        </div>
      </div>
    </div>
  );
}

export default App;