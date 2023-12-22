import { useCallback, useState } from 'react';
import DisplayResult from './components/DisplayResult';
import ActionButton from './components/ActionButton';
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
        <ActionButton
          onClick={handleAnalysis}
          isDisabled={state.analyzing}
          text={state.analyzing ? 'Analyzing...' : 'Analyze'}
          isTeal
        />
        <ActionButton
          onClick={handleGeneration}
          isDisabled={state.generating}
          text={state.generating ? 'Generating...' : 'Generate'}
          isRed
        />
      </div>
      <DisplayResult
        analyzedResult={state.analyzedResult}
        generatedImageData={state.generatedImageData}
      />
    </div>
  );
}

export default App;
