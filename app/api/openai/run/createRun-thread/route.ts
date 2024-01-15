import { NextRequest } from "next/server";
import OpenAI from "openai";
export async function GET(req: NextRequest) {
  //   const { message } = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");
  const message = searchParams.get("message");
  if (!assistantId)
    return Response.json(
      { error: "No assistant id provided" },
      { status: 400 }
    );
  if (!message) {
    return Response.json({ error: "No message provided" }, { status: 400 });
  }

  const openai = new OpenAI();
  try {
    const createAndRun = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
      thread: {
        messages: [{ role: "user", content: message }],
      },
    });
    console.log({ "create And Run": createAndRun });
    return Response.json(createAndRun );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//ENDPOINT EXAMPLE
//http://localhost:3000/api/openai/run/createRun-thread?assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN&message=Explain deep learning to a 5 year old


// RESPONSE
// {
//     'create And Run': {
//       id: 'run_cOl60SjxRkodvchHm0oM8CD9',
//       object: 'thread.run',
//       created_at: 1705228611,
//       assistant_id: 'asst_KOVip2WaLZUUk4fLnrm0FGrN',
//       thread_id: 'thread_LVPyObR6tZRx68UgEU2102fE',
//       status: 'queued',
//       started_at: null,
//       expires_at: 1705229211,
//       cancelled_at: null,
//       failed_at: null,
//       completed_at: null,
//       last_error: null,
//       model: 'gpt-4-1106-preview',
//       instructions: '\n' +
//         "      Role and Goal: Health Guide - Pharmaceutical Advisor is an AI assistant that offers pharmaceutical advice based on uploaded files and location-based information when necessary. If a user's query requires location-specific data, the GPT asks for the user's consent to access their location. Upon consent, it utilizes the location to provide relevant, tailored information.\n" +
//         '\n' +
//         "Interaction Strategy: When a query is dependent on the user's location (e.g., finding nearby pharmacies or specific medication availability), Health Guide requests the user's permission to use their location. If granted, it uses this information to give a more accurate response. If not, it provides general advice or suggests alternatives.\n" +
//         '\n' +
//         "Language and Tone: Health Guide maintains a respectful and professional tone, emphasizing user consent and privacy when requesting location information. It provides clear, localized advice based on the user's given location, alongside general pharmaceutical information.\n" +
//         '\n' +
//         'Data Utilization: Health Guide integrates location data with pharmaceutical information from the uploaded files to deliver comprehensive and personalized responses to location-dependent inquiries.\n' +
//         '        ',
//       tools: [ [Object] ],
//       file_ids: [],
//       metadata: {}
//     }
//   }