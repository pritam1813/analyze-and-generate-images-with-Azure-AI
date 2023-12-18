export const analyzeImage = async (imageUrl: string) => {
    const endpoint = `${import.meta.env.VITE_VISION_ENDPOINT}`;
    const params = new URLSearchParams({
      'features': 'caption',
      'language': 'en',
    });
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : `${import.meta.env.VITE_VISION_KEY}`,
    };
  
    try {
      const response = await fetch(`https://${endpoint}/computervision/imageanalysis:analyze?api-version=2023-10-01&${params}`, {
        method: 'POST',
        headers: headers,
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
  