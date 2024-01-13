import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  const runId = searchParams.get("runId");

  if (!threadId)
    return Response.json({ error: "No thread id provided" }, { status: 400 });
  if (!runId)
    return Response.json({ error: "No run id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);

    console.log(run);

    return Response.json({ run: run });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
// RESPONSE
// {
//     "id": "run_abc123",
//     "object": "thread.run",
//     "created_at": 1699075072,
//     "assistant_id": "asst_abc123",
//     "thread_id": "thread_abc123",
//     "status": "completed",
//     "started_at": 1699075072,
//     "expires_at": null,
//     "cancelled_at": null,
//     "failed_at": null,
//     "completed_at": 1699075073,
//     "last_error": null,
//     "model": "gpt-3.5-turbo",
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
  