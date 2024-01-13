import { NextRequest } from "next/server";
import OpenAI from "openai";

//Get list of messages from one thread id
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");

  if (!threadId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const response = await openai.beta.threads.messages.list(threadId);

    console.log(response);

    return Response.json({ messages: response.data });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
//RESPONSE
// {
//     "object": "list",
//     "data": [
//       {
//         "id": "msg_abc123",
//         "object": "thread.message",
//         "created_at": 1699016383,
//         "thread_id": "thread_abc123",
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": {
//               "value": "How does AI work? Explain it in simple terms.",
//               "annotations": []
//             }
//           }
//         ],
//         "file_ids": [],
//         "assistant_id": null,
//         "run_id": null,
//         "metadata": {}
//       },
//       {
//         "id": "msg_abc456",
//         "object": "thread.message",
//         "created_at": 1699016383,
//         "thread_id": "thread_abc123",
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": {
//               "value": "Hello, what is AI?",
//               "annotations": []
//             }
//           }
//         ],
//         "file_ids": [
//           "file-abc123"
//         ],
//         "assistant_id": null,
//         "run_id": null,
//         "metadata": {}
//       }
//     ],
//     "first_id": "msg_abc123",
//     "last_id": "msg_abc456",
//     "has_more": false
//   }
  