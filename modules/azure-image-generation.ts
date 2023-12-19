import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// You will need to set these environment variables or edit the following values
const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const azureApiKey =  import.meta.env.VITE_AZURE_API_KEY;

const size = "1024x1024";
// The number of images to generate
const n = 1;

export const generateImage = async (prompt:string) => {
  try {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentName = import.meta.env.VITE_DEPLOYMENT_NAME;
    const result = await client.getImages(deploymentName, prompt, { n, size });
    
    return result.data[0].url;
  } catch (error) {
    console.log("Error in generating image: ",error);
  }
}