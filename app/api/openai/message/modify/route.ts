import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const threadId = searchParams.get("threadId");
    const messageId = searchParams.get("messageId");
    //Get user id to send it into the body of the request
    const userId = searchParams.get("userId");
    

    if (!threadId)
    return Response.json(
      { error: "No thread id provided" },
      { status: 400 }
    );
  if (!messageId)
    return Response.json({ error: "No messageId provided" }, { status: 400 });

  const openai = new OpenAI();
  try {
    
      const updateMessage = await openai.beta.threads.messages.update(
        threadId,messageId,
        {
          metadata: {
            modified: "true",
            user: userId,
          },
        })
  } catch (error) {
    
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
//     "metadata": {
//       "modified": "true",
//       "user": "abc123"
//     }
//   }
  