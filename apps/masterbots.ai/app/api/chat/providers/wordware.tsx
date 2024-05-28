//! This is just a sample documentation from the wordware api team im keeping it here for reference and to understand

// const API_KEY = 'YOUR_API_KEY'
// const promptId = 'YOUR_PROMPT_ID'

// async function main() {
//   // First describe the prompt to see which inputs are required
//   const describeResponse = await fetch(
//     `https://app.wordware.ai/api/prompt/${promptId}/describe`,
//     {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`
//       }
//     }
//   )

//   console.log(await describeResponse.json())

//   // Then run the prompt, streaming the outputs as they're generated
//   const runResponse = await fetch(
//     `https://app.wordware.ai/api/prompt/${promptId}/run`,
//     {
//       method: 'post',
//       body: JSON.stringify({
//         inputs: {
//           topic: 'Sugary cereal',
//           // Image inputs have a different format and require a publicly
//           // accessible URL
//           image: {
//             type: 'image',
//             image_url: 'https://i.insider.com/602ee9ced3ad27001837f2ac'
//           }
//         }
//       }),
//       headers: {
//         Authorization: `Bearer ${API_KEY}`
//       }
//     }
//   )

//   const reader = runResponse.body?.getReader()

//   const decoder = new TextDecoder()
//   let buffer: string[] = []

//   try {
//     while (true) {
//       const { done, value } = await reader.read()

//       if (done) {
//         return
//       }

//       const chunk = decoder.decode(value)

//       for (let i = 0, len = chunk.length; i < len; ++i) {
//         const isChunkSeparator = chunk[i] === '\n'

//         // Keep buffering unless we've hit the end of a data chunk
//         if (!isChunkSeparator) {
//           buffer.push(chunk[i])
//           continue
//         }

//         const line = buffer.join('').trimEnd()

//         // This is the chunk
//         const content = JSON.parse(line)
//         const value = content.value

//         // Here we print the streamed generations
//         if (value.type === 'generation') {
//           if (value.state === 'start') {
//             console.log('\nNEW GENERATION -', value.label)
//           } else {
//             console.log('\nEND GENERATION -', value.label)
//           }
//         } else if (value.type === 'chunk') {
//           process.stdout.write(value.value ?? '')
//         } else if (value.type === 'outputs') {
//           console.log(value)
//         }

//         buffer = []
//       }
//     }
//   } finally {
//     reader.releaseLock()
//   }
// }

// main()
