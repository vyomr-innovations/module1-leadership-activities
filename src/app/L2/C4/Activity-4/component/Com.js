"use client"
// components/Com.jsx
import { useState } from 'react';

const Com = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const correctAnswers = {
    blank1: 'lost',
    blank2: 'scary',
    blank3: 'worried',
    blank4: 'nervous',
    blank5: 'frightening',
    blank6: 'lost',
    blank7: 'relieved',
    blank8: 'happy',
    blank9: 'glad',
    blank10: 'happy',
    blank11: 'lost',
    blank12: 'better',
    blank13: 'safe',
    blank14: 'excited',
  };

  const checkAnswer = (blankId, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [blankId]: selectedOption,
    }));
  };

  const renderBlank = (id, options) => {
    const isCorrect = selectedAnswers[id] === correctAnswers[id];
    const isIncorrect = selectedAnswers[id] && selectedAnswers[id] !== correctAnswers[id];

    return (
      <>
        <span
          className={`inline-block border-b-2 border-gray-400 px-2 min-w-[80px] text-center
            ${isCorrect ? 'text-green-600 font-semibold' : ''}
            ${isIncorrect ? 'text-red-600 font-semibold' : ''}
          `}
        >
          {selectedAnswers[id] ? selectedAnswers[id] : '______'}
        </span>
        <span className="ml-2 space-x-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => checkAnswer(id, option)}
              className={`px-3 py-1 rounded-md transition-colors duration-200
                ${selectedAnswers[id] === option
                  ? isCorrect
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }
              `}
            >
              {option}
            </button>
          ))}
        </span>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center leading-tight">
          Fill in the Blanks - Emotion Words
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Hui:</strong> You won’t believe what happened at the funfair today! I got{' '}
          {renderBlank('blank1', ['lost', 'confused'])} in the crowd and didn’t know where my parents went.
          <br /><br />

          <strong>Mui:</strong> Oh no! That sounds {renderBlank('blank2', ['scary', 'exciting'])}! How did you feel when you couldn’t find them?
          <br /><br />

          <strong>Hui:</strong> I felt so {renderBlank('blank3', ['worried', 'relaxed'])} and{' '}
          {renderBlank('blank4', ['nervous', 'calm'])}.
          <br /><br />

          <strong>Mui:</strong> That must have been so {renderBlank('blank5', ['frightening', 'peaceful'])}! What did you do?
          <br /><br />

          <strong>Hui:</strong> I started walking around, trying to look for them, but it seemed like the more I walked, the more{' '}
          {renderBlank('blank6', ['lost', 'found'])} I felt. I was about to cry when suddenly, I saw my mom’s face in the crowd! I felt{' '}
          {renderBlank('blank7', ['relieved', 'angry'])} and {renderBlank('blank8', ['happy', 'upset'])}! I ran up to her and hugged her so tightly.
          <br /><br />

          <strong>Mui:</strong> That’s such a great feeling! I bet you were so {renderBlank('blank9', ['glad', 'sad'])} to find them.
          <br /><br />

          <strong>Hui:</strong> Yes! I felt like a huge weight had been lifted off my shoulders. I was so{' '}
          {renderBlank('blank10', ['happy', 'scared'])} to be with them again. I never want to get{' '}
          {renderBlank('blank11', ['lost', 'found'])} like that again!
          <br /><br />

          <strong>Mui:</strong> I can imagine! It’s good that you stayed calm and found your parents. Now you must feel much{' '}
          {renderBlank('blank12', ['better', 'worse'])}!
          <br /><br />

          <strong>Hui:</strong> Definitely! I felt {renderBlank('blank13', ['safe', 'scared'])} and{' '}
          {renderBlank('blank14', ['excited', 'tired'])} again. It was a little scary, but it ended up being okay!
        </p>
      </div>
    </div>
  );
};

export default Com;