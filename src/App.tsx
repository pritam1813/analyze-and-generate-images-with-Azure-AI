import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');

  const handleAnalysis = () => {
    // Add your image analysis function here
    console.log('Image analysis for: ', input);
  };
  const handleGeneration = () => {
    // Add your image generation function here
    console.log('Image generation for: ', input);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-8'>Computer Vision</h1>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter URL to analyze or text prompt to generate an image'
        className='px-3 py-2 mb-4 w-full md:w-1/2 lg:w-1/3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
      />
      <div className='space-x-4'>
        <button
          onClick={handleAnalysis}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Analyze Image
        </button>
        <button
          onClick={handleGeneration}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Generate Image
        </button>
      </div>
    </div>
  );
}

export default App;
