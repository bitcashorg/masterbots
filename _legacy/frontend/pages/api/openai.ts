import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const openaiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('Received POST request. Request Body:', req.body);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: req.body.prompt
          }],
          temperature: 0.7,
          max_tokens: 3000,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('OpenAI API Response:', response.data);
      
      // Extract the bot's reply from the OpenAI response
      const message = response.data.choices[0].message.content;

      // Return the extracted message in the response
      res.status(200).json({ message: message });
      
    } catch (error: unknown) {
      console.error('Error in calling OpenAI API:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('OpenAI API Error:', error.response.data);
        } else if (error.request) {
          console.error('No response from OpenAI API:', error.request);
        } else {
          console.error('Request setup error:', error.message);
        }
      }

      res.status(500).json({ error: 'OpenAI API call failed' });
    }
  } else {
    console.log(`Method ${req.method} is not allowed.`);
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default openaiHandler;




