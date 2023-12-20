export const analyzeImage = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/image_analysis', {
        method: 'POST',
        body: JSON.stringify({ url: imageUrl }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error analyzing image: ', error);
    }
  };
  