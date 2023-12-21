interface DisplayResultsProps {
  analyzedResult: any;
  generatedImageData: any;
}

function DisplayResults({
  analyzedResult,
  generatedImageData,
}: DisplayResultsProps) {
  if (!analyzedResult && !generatedImageData) return null;
  return (
    <div className='container mx-auto px-4'>
      {analyzedResult && (
        <>
          <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h2 className='text-2xl font-bold mb-4'>Computer Vision Result</h2>
            <img
              className='w-32 md:w-64 lg:w-96 object-cover mb-4'
              src={analyzedResult.imageUrl}
              alt='Analyzed Image'
            />
            <h3 className='text-xs md:text-base lg:text-lg mb-4 w-4/5'>
              Caption:{' '}
              <span className='font-bold'>
                {analyzedResult.captionResult.text}
              </span>
            </h3>
            <pre className='text-left text-xs md:text-base lg:text-lg text-gray-600 bg-gray-200 overflow-auto whitespace-pre-wrap p-2 w-4/5'>
              {JSON.stringify(analyzedResult, null, 2)}
            </pre>
          </div>
        </>
      )}
      {generatedImageData != '' && (
        <>
          <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h2 className='text-2xl font-bold mb-4'>Generated Image</h2>
            <img
              className='w-32 md:w-64 lg:w-96 object-cover mb-4'
              src={generatedImageData.data[0].url}
              alt='Generated Image'
            />
            <pre className='text-left text-xs md:text-base lg:text-lg text-gray-600 bg-gray-200 overflow-auto whitespace-pre-wrap p-2 w-4/5'>
              {JSON.stringify(generatedImageData, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayResults;
