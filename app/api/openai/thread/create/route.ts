import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const thread = await openai.beta.threads.create();

    console.log(thread);

    return Response.json(thread );
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}

//RESPONSE
// {
//     "id": "thread_abc123",
//     "object": "thread",
//     "created_at": 1699012949,
//     "metadata": {}
//   }
  