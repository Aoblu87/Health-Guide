import { NextRequest } from "next/server";
import OpenAI from "openai";
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");

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
  
    console.log({"create And Run":createAndRun});
} catch (error:any) {
    return Response.json({ error: error.message }, { status:500})
}
}
// RESPONSE
// {
//     "id": "run_abc123",
//     "object": "thread.run",
//     "created_at": 1699076792,
//     "assistant_id": "asst_abc123",
//     "thread_id": "thread_abc123",
//     "status": "queued",
//     "started_at": null,
//     "expires_at": 1699077392,
//     "cancelled_at": null,
//     "failed_at": null,
//     "completed_at": null,
//     "last_error": null,
//     "model": "gpt-4",
//     "instructions": "You are a helpful assistant.",
//     "tools": [],
//     "file_ids": [],
//     "metadata": {}
//   }
