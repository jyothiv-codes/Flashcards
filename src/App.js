import React, { useState, useEffect } from 'react';
import './App.css';
// Spanish vocab
const flashcardsData = [
  { question: 'Hola', answer: 'Hello' },
  { question: '¿Cómo estás?', answer: 'How are you?' },
  { question: 'Buenos días', answer: 'Good morning' },
  { question: 'Por favor', answer: 'Please' },
  { question: 'Gracias', answer: 'Thank you' },
  { question: 'Mucho gusto', answer: 'Nice to meet you' },
  { question: 'Me gusta', answer: 'I like it' },
  { question: 'Estoy bien', answer: 'I\'m fine' }

];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Shuffle the order of flashcards
  useEffect(() => {
    shuffle(flashcardsData);
  }, []);

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1));
    setFlipped(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === flashcardsData.length - 1 ? 0 : prevIndex + 1));
    setFlipped(false);
  };

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (event.key === 'ArrowRight') {
        handleNextCard();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <div className="flashcard-container">
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleCardFlip}>
          <div className="front">{flashcardsData[currentCardIndex].question}</div>
          <div className="back">{flashcardsData[currentCardIndex].answer}</div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevCard}>&#8592;</button>
        <button onClick={handleNextCard}>&#8594;</button>
      </div>
    </div>
  );
}

export default App;
