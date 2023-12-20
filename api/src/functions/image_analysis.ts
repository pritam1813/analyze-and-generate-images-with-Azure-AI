import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

import axios from 'axios';

const endpoint = process.env.VISION_ENDPOINT;

const params = new URLSearchParams({
  features: 'caption',
  language: 'en',
});

const headers = {
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-Key': `${process.env.VISION_KEY}`,
};

interface RequestBody {
  url?: string;
}

export async function image_analysis(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const bodyContent: RequestBody = await request.json();
  const imageUrl = bodyContent.url;

  //Vision API Call
  try {
    const visionResponse = await axios.post(
      `https://${endpoint}/computervision/imageanalysis:analyze?api-version=2023-10-01&${params}`,
      { url: imageUrl },
      { headers: headers }
    );

    return {
      jsonBody: visionResponse.data,
    };
  } catch (error) {
    return {
      body: JSON.stringify({
        error: 'Error calling Azure Computer Vision API',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}

app.http('image_analysis', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: image_analysis,
});
