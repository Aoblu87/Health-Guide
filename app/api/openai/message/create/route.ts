import { NextRequest } from "next/server";
import OpenAI from "openai";

//Create message from user input
export async function POST(req: NextRequest) {
    //Get message and thread id from request body
  const { message, threadId } = await req.json();

  if (!threadId ){
    return Response.json({ error: "Thread id not found" }, { status: 400 });
  }
  if(!message ){
    return Response.json({ error: "Message not found" }, { status: 400 });
  }
  const openai = new OpenAI();

  try {
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    console.log(threadMessage);

    return Response.json({ message: threadMessage });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}

//RESPONSE
// {
//     "id": "msg_abc123",
//     "object": "thread.message",
//     "created_at": 1699017614,
//     "thread_id": "thread_abc123",
//     "role": "user",
//     "content": [
//       {
//         "type": "text",
//         "text": {
//           "value": "How does AI work? Explain it in simple terms.",
//           "annotations": []
//         }
//       }
//     ],
//     "file_ids": [],
//     "assistant_id": null,
//     "run_id": null,
//     "metadata": {}
//   }
  