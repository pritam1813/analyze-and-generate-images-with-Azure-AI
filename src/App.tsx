import { useCallback, useState } from 'react';
import { analyzeImage } from '../modules/azure-image-analysis';
import { generateImage } from '../modules/azure-image-generation';

interface State {
  input: string;
  analyzing: boolean;
  generating: boolean;
  analyzedResult: any;
  generatedImageData: any;
  buttonHoverCursor: string;
}

function App() {
  const [state, setState] = useState<State>({
    input: '',
    analyzing: false,
    generating: false,
    analyzedResult: null,
    generatedImageData: null,
    buttonHoverCursor: 'cursor-pointer',
  });

  const handleAnalysis = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      analyzing: true,
      generatedImageData: '',
      buttonHoverCursor: 'cursor-not-allowed',
    }));
    try {
      const analysis = await analyzeImage(state.input);
      setState((prevState) => ({
        ...prevState,
        analyzedResult: analysis,
        analyzing: false,
        buttonHoverCursor: 'cursor-pointer',
      }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, analyzing: false }));
    }
  }, [state.input]);

  const handleGeneration = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      generating: true,
      analyzedResult: null,
      buttonHoverCursor: 'cursor-not-allowed',
    }));
    try {
      const generatedImage = await generateImage(state.input);
      setState((prevState) => ({
        ...prevState,
        generatedImageData: generatedImage,
        generating: false,
        buttonHoverCursor: 'cursor-pointer',
      }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, generating: false }));
    }
  }, [state.input]);

  const DisplayResults = () => {
    if (!state.analyzedResult && !state.generatedImageData) return null;

    return (
      <div className='mt-8 flex flex-col items-center justify-center'>
        {state.analyzedResult && (
          <>
            <h2 className='text-2xl font-bold mb-4'>Computer Vision Result</h2>

            <img
              src={state.input}
              alt='Analyzed Image'
              className='mb-4 w-full md:w-1/2 lg:w-1/3 object-contain'
            />
            <h3 className='text-xl mb-4'>
              Caption:{' '}
              <span className='font-bold'>
                {state.analyzedResult.captionResult.text}
              </span>
            </h3>
            <pre className='text-left bg-gray-200 p-4 rounded w-full md:w-1/2 lg:w-1/3 overflow-y-auto'>
              {JSON.stringify(state.analyzedResult, null, 2)}
            </pre>
          </>
        )}
        {state.generatedImageData != '' && (
          <>
            <h2 className='text-2xl font-bold mb-4'>Generated Image</h2>
            <img
              src={state.generatedImageData.data[0].url}
              alt='Generated Image'
              className='mb-4 w-full md:w-1/2 lg:w-1/3 object-contain'
            />
            <pre className='text-left bg-gray-200 p-4 rounded w-full md:w-1/2 lg:w-1/3 overflow-y-auto'>
              {JSON.stringify(state.generatedImageData, null, 2)}
            </pre>
          </>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-8'>Computer Vision</h1>
      <input
        type='text'
        value={state.input}
        onChange={(e) =>
          setState((prevState) => ({ ...prevState, input: e.target.value }))
        }
        placeholder='Enter URL to analyze or text prompt to generate an image'
        className='px-3 py-2 mb-4 w-full md:w-1/2 lg:w-1/3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
      />
      <div className='space-x-4'>
        <button
          onClick={handleAnalysis}
          className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 ${state.buttonHoverCursor} overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800`}
          disabled={state.analyzing}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            {state.analyzing ? 'Analyzing...' : 'Analyze'}
          </span>
        </button>
        <button
          onClick={handleGeneration}
          className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 ${state.buttonHoverCursor} overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400`}
          disabled={state.generating}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            {state.generating ? 'Generating...' : 'Generate'}
          </span>
        </button>
      </div>
      <DisplayResults />
    </div>
  );
}

export default App;
