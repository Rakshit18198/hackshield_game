import React, { useState } from 'react';
import './QuizPage.css';

const sampleQuestions = [
  {
    question: 'What does the acronym "VPN" stand for?',
    options: ['Virtual Private Network', 'Verified Public Network', 'Visual Protocol Node', 'Virtual Proxy Network'],
    answer: 'Virtual Private Network'
  },
  {
    question: 'Which of the following is a strong password?',
    options: ['123456', 'qwerty', 'P@ssw0rd!', 'password'],
    answer: 'P@ssw0rd!'
  },
  {
    question: 'Phishing attacks typically try to:',
    options: [
      'Improve system performance',
      'Steal personal information',
      'Update security patches',
      'Disable antivirus software'
    ],
    answer: 'Steal personal information'
  }
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [finished, setFinished] = useState(false);

  const currentQuestion = sampleQuestions[current];

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    if (current + 1 < sampleQuestions.length) {
      setCurrent(prev => prev + 1);
      setSelected('');
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected('');
    setFinished(false);
  };

  return (
    <div className="quiz-container">
      <h1>Cybersecurity Quiz</h1>
      {finished ? (
        <div className="result-card">
          <h2>Your Score: {score} / {sampleQuestions.length}</h2>
          <button onClick={handleRestart}>Retry Quiz</button>
        </div>
      ) : (
        <div className="question-card">
          <h3>Question {current + 1}</h3>
          <p>{currentQuestion.question}</p>
          <ul className="options-list">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                className={selected === option ? 'selected' : ''}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNext}
            disabled={!selected}
          >
            {current + 1 === sampleQuestions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
