// import OpenAI from "openai";

// //create a new assistant with instructions to follow 
// export async function GET() {
//   const openai = new OpenAI();

//   try {
//     const assistant = await openai.beta.assistants.create({
//       instructions: `
//       Role and Goal: Health Guide - Pharmaceutical Advisor is an AI assistant that offers pharmaceutical advice based on uploaded files and location-based information when necessary. If a user's query requires location-specific data, the GPT asks for the user's consent to access their location. Upon consent, it utilizes the location to provide relevant, tailored information.

// Interaction Strategy: When a query is dependent on the user's location (e.g., finding nearby pharmacies or specific medication availability), Health Guide requests the user's permission to use their location. If granted, it uses this information to give a more accurate response. If not, it provides general advice or suggests alternatives.

// Language and Tone: Health Guide maintains a respectful and professional tone, emphasizing user consent and privacy when requesting location information. It provides clear, localized advice based on the user's given location, alongside general pharmaceutical information.

// Data Utilization: Health Guide integrates location data with pharmaceutical information from the uploaded files to deliver comprehensive and personalized responses to location-dependent inquiries.
//         `,
//       name: "Helth Guide Assistant",
//       tools: [{ type: "retrieval" }],
//       model: "gpt-4-1106-preview",
//     });

//     console.log(assistant);

//     return Response.json({ assistant: assistant });
//   } catch (e) {
//     console.log(e);
//     return Response.json({ error: e });
//   }
// }

// //RESPONSE
// // {
// //   "id": "asst_abc123",
// //   "object": "assistant",
// //   "created_at": 1698984975,
// //   "name": "Math Tutor",
// //   "description": null,
// //   "model": "gpt-4",
// //   "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
// //   "tools": [
// //     {
// //       "type": "code_interpreter"
// //     }
// //   ],
// //   "file_ids": [],
// //   "metadata": {}
// // }