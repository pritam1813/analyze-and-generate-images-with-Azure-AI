import { useState } from 'react';
import { analyzeImage } from '../modules/azure-image-analysis';

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalysis = async () => {
    // Add your image analysis function here
    setLoading(true);
    const analysis = await analyzeImage(input);
    setResults(analysis);
    setLoading(false);
  };

  const handleGeneration = () => {
    // Add your image generation function here
    console.log('Image generation for: ', input);
  };

  const DisplayResults = () => {
    if (!results) return null;

    return (
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Computer Vision Analysis</h2>
        <img
          src={input}
          alt='Analyzed'
          className='mb-4 w-full md:w-1/2 lg:w-1/3 object-contain'
        />
        <pre className='text-left bg-gray-200 p-4 rounded'>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    );
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
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
        <button
          onClick={handleGeneration}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Generate Image
        </button>
      </div>
      <DisplayResults />
    </div>
  );
}

export default App;
