import { NextRequest } from "next/server";
import OpenAI from "openai";


//Upload file to assistant 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");
  const fileId = searchParams.get("fileId");
//If assistant does not exist give error
  if (!assistantId)
    return Response.json(
      { error: "No assistant id provided" },
      { status: 400 }
    );
    //If file does not exist give error
  if (!fileId)
    return Response.json({ error: "No file id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    //Create assistant file with file id and assistant id 
    const assistantFile = await openai.beta.assistants.files.create(
      assistantId,
      {
        file_id: fileId,
      }
    );

    console.log(assistantFile);

    return Response.json({ assistantFile: assistantFile });
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
  