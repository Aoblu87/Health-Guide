import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  const assistantId = searchParams.get("assistantId");
  const instructions = searchParams.get("instructions");

  if (!assistantId) {
    return Response.json({ error: "No assistantId provided" }, { status: 400 });
  }
  if (!threadId) {
    return Response.json({ error: "No threadId provided" }, { status: 400 });
  }
  const openai = new OpenAI();
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: instructions,
    });
    return Response.json({ NewRun: run }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}

//ENDPOINT
// http://localhost:3000/api/openai/run/create?threadId=thread_OzapNbUDhBfkeBykYCw77PXn&assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN

//RESPONSE
// {
//     "id": "run_abc123",
//     "object": "thread.run",
//     "created_at": 1699063290,
//     "assistant_id": "asst_abc123",
//     "thread_id": "thread_abc123",
//     "status": "queued",
//     "started_at": 1699063290,
//     "expires_at": null,
//     "cancelled_at": null,
//     "failed_at": null,
//     "completed_at": 1699063291,
//     "last_error": null,
//     "model": "gpt-4",
//     "instructions": null,
//     "tools": [
//       {
//         "type": "code_interpreter"
//       }
//     ],
//     "file_ids": [
//       "file-abc123",
//       "file-abc456"
//     ],
//     "metadata": {}
//   }
