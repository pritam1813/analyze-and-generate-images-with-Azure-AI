export const generateImage = async (prompt:string) => {
  try {
    const response = await fetch('/api/image_generation', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in generating image: ",error);
  }
}