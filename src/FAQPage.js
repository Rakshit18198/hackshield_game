// src/FAQPage.js
import React, { useState } from 'react';
import './FAQPage.css';

const faqs = [
  {
    question: "What is HackShield?",
    answer: "HackShield is an educational cybersecurity game that teaches you how to defend against virtual threats in a fun, interactive way.",
  },
  {
    question: "How do I start a mission?",
    answer: "Log in, go to the Dashboard, and click 'Start New Mission'. You’ll be guided through the objectives step by step.",
  },
  {
    question: "Do I need coding experience?",
    answer: "Not at all! HackShield is designed for all skill levels. Hints and tools are provided to help you along the way.",
  },
  {
    question: "Can I track my progress?",
    answer: "Yes! The Dashboard shows your total score, completed levels, and earned badges.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>❓ Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
