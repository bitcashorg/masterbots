import fetch from 'isomorphic-unfetch';
import { serverEnv } from 'masterbots-lib/constants';

export async function updateOpenAiConversation(
  callback: (response: string, done?: boolean) => any,
  prompt: string,
  conversationId?: string
) {
  try {
    console.log('📝 createNewPlayground::ℹ️ Getting Conversation IDs ℹ️', {
      conversationId
    });

    const openAiHeaders: OpenAiAPIHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    }

    if (conversationId)
      openAiHeaders['Openai-Conversation-Id'] = conversationId;

    const body: OpenAiAPIBody = {
      prompt,
      conversationId,
    };

    await fetch(serverEnv.api.baseUrl + '/api/openai', {
      method: 'POST',
      headers: openAiHeaders,
      body: JSON.stringify(body)
    }).then((response) => {
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read the stream
      function push() {
        reader
          .read()
          .then(({ done, value }) => {
            const str = decoder.decode(value, { stream: true });
            console.log(str);

            if (done) {
              console.log('Stream complete');

              // If stream is done, we can end the connection
              callback(str, true);
              return;
            }

            callback(str);
            // Read the next chunk
            push();
          })
          .catch((err) => {
            console.error('Stream reading error:', err);
          });
      }

      // Start reading the stream
      push();
    });
  } catch (error) {
    console.error('openai.service::createNewPlayground::ERROR', error);
  }
}

export type OpenAiAPIHeaders = HeadersInit & {
  'Openai-Conversation-Id'?: string;
  'Openai-Ephemeral-User-Id'?: string;
}

export type OpenAiAPIBody = {
  prompt: string;
  conversationId?: string;
}
