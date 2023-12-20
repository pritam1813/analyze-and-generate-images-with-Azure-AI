import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const client = new OpenAIClient(
  process.env.AZURE_OPENAI_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_API_KEY)
);
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

interface RequestBody {
  prompt?: string;
}

export async function image_generation(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const bodyContent: RequestBody = await request.json();
  const prompt = bodyContent.prompt;

  const size = '1024x1024';
  // The number of images to generate
  const n = 1;

  try {
    const imageData = await client.getImages(deploymentName, prompt, {
      n,
      size,
    });
    context.log("IMAGE Data: ", imageData);
    context.log("IMAGE URL", imageData.data[0].url);
    return { jsonBody: imageData };
  } catch (error) {
    return {
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}

app.http('image_generation', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: image_generation,
});
