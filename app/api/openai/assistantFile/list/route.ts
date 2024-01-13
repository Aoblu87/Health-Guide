import { NextRequest } from "next/server";
import OpenAI from "openai";

//Get all files from assistant id
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");

  if (!assistantId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const assistantFiles = await openai.beta.assistants.files.list(assistantId);

    console.log(assistantFiles);

    return Response.json({ assistantFiles: assistantFiles });
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
//         "id": "file-abc123",
//         "object": "assistant.file",
//         "created_at": 1699060412,
//         "assistant_id": "asst_abc123"
//       },
//       {
//         "id": "file-abc456",
//         "object": "assistant.file",
//         "created_at": 1699060412,
//         "assistant_id": "asst_abc123"
//       }
//     ],
//     "first_id": "file-abc123",
//     "last_id": "file-abc456",
//     "has_more": false
//   }
  