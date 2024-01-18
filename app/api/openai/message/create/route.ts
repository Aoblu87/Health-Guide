import { NextRequest } from "next/server";
import OpenAI from "openai";

//Create message from user input
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  const message = searchParams.get("message");


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
  } catch (error:any) {
    console.log(error);
    return Response.json({ error: error });
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
  