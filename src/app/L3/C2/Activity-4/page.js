// app/page.js
"use client"; // This is a Client Component

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    feeling: '',
    reason: '',
    face: '', // Re-adding this for potential use
    whatHappened: '',
    feelLike: '',
    moodMeter: '',
    feelingName: '',
    action: '',
    whatElse: '',
    didWhenFeeling: '',
    helpFriend: '',
    whenFeeling: '',
  });
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
          Character Emotions & Responses
        </h2>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Recognize Section */}
            <Section title="Recognize" color="bg-blue-50" borderColor="border-blue-400">
              <Input
                id="feeling"
                label="How is the character feeling?"
                placeholder="e.g., Happy, Sad, Angry"
                value={formData.feeling}
                onChange={handleChange}
                required
              />
              <Input
                id="reason"
                label="How do you know he/she is feeling that way?"
                placeholder="e.g., Their smile, clenched fists"
                value={formData.reason}
                onChange={handleChange}
                required
              />
              <h1 className='block text-gray-800 text-base font-semibold mb-2'>Can you show me a face expression of how the character is feeling?</h1>
            </Section>

            {/* Understand Section */}
            <Section title="Understand" color="bg-yellow-50" borderColor="border-yellow-400">
              <Input
                id="whatHappened"
                label="What happened that made the character feel ___________?"
                placeholder="Describe the event"
                value={formData.whatHappened}
                onChange={handleChange}
                required
              />
              <Input
                id="feelLike"
                label="What happens that makes you feel ___________?"
                placeholder="Relate to personal experience"
                value={formData.feelLike}
                onChange={handleChange}
                required
              />
            </Section>

            {/* Label Section */}
            <Section title="Label" color="bg-green-50" borderColor="border-green-400">
              <Input
                id="moodMeter"
                label="Where would you put this character on the mood meter?"
                placeholder="e.g., Green (Calm), Red (Angry)"
                value={formData.moodMeter}
                onChange={handleChange}
                required
              />
              <Input
                id="feelingName"
                label="What is the name of this feeling?"
                placeholder="Specific emotion, e.g., Joy, Frustration"
                value={formData.feelingName}
                onChange={handleChange}
                required
              />
            </Section>

            {/* Express Section */}
            <Section title="Express" color="bg-orange-50" borderColor="border-orange-400">
              <Input
                id="action"
                label="How did the character act when he/she was feeling ___________?"
                placeholder="Describe their actions"
                value={formData.action}
                onChange={handleChange}
                required
              />
              <Input
                id="whatElse"
                label="What else can you do when you are feeling ___________?"
                placeholder="Alternative responses or actions"
                value={formData.whatElse}
                onChange={handleChange}
                required
              />
            </Section>

            {/* Regulate Section */}
            <Section title="Regulate" color="bg-purple-50" borderColor="border-purple-400">
              <Input
                id="didWhenFeeling"
                label="What did the character do when he/she felt ___________?"
                placeholder="How did they manage their emotion?"
                value={formData.didWhenFeeling}
                onChange={handleChange}
                required
              />
              <Input
                id="helpFriend"
                label="What could you do to help a friend who is feeling ___________?"
                placeholder="Suggestions for support"
                value={formData.helpFriend}
                onChange={handleChange}
                required
              />
              <Input
                id="whenFeeling"
                label="When you feel ___________ , what do you do?"
                placeholder="Personal coping strategies"
                value={formData.whenFeeling}
                onChange={handleChange}
                required
              />
            </Section>

            <button
              type="submit"
              className="cursor-pointer w-full py-4 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              Submit Emotions
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 rounded-xl shadow-inner p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submitted Information</h3>
            <div className="space-y-4 text-gray-700 text-lg">
              <ResultItem label="Feeling" value={formData.feeling} />
              <ResultItem label="Reason" value={formData.reason} />
              <ResultItem label="What happened" value={formData.whatHappened} />
              <ResultItem label="What makes you feel" value={formData.feelLike} />
              <ResultItem label="Mood Meter" value={formData.moodMeter} />
              <ResultItem label="Feeling Name" value={formData.feelingName} />
              <ResultItem label="Character Action" value={formData.action} />
              <ResultItem label="What else you can do" value={formData.whatElse} />
              <ResultItem label="Character Reaction" value={formData.didWhenFeeling} />
              <ResultItem label="Helping a Friend" value={formData.helpFriend} />
              <ResultItem label="What do you do" value={formData.whenFeeling} />
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={handlePrint}
                className="cursor-pointer py-3 px-8 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Print Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, children, color, borderColor }) => (
  <div className={`border-l-4 ${borderColor} ${color} p-6 rounded-lg shadow-sm`}>
    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-3">
      {title}
    </h3>
    <div className="space-y-5">
      {children}
    </div>
  </div>
);

// Reusable Input Component
const Input = ({ id, label, placeholder, value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-gray-800 text-base font-semibold mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500"
    />
  </div>
);

// Reusable Result Item Component
const ResultItem = ({ label, value }) => (
  <p className="flex justify-between items-start">
    <strong className="text-gray-900 font-semibold min-w-[180px]">{label}:</strong>
    <span className="flex-1 text-right ml-4 text-gray-800">{value || 'N/A'}</span>
  </p>
);