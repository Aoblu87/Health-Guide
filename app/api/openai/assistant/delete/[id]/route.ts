import { NextRequest } from "next/server";
import OpenAI from "openai";

//Delete an assistant 
export async function GET(request: NextRequest,{params}:{params:{id:string}}) {
  //I use params.id to get the id of the assistant I want to delete
  const id = params.id;
  //I could also use request.nextUrl.searchParams to get the id from the url query string used in the frontend request
  // const searchParams = request.nextUrl.searchParams;
  // const assistantId = searchParams.get("assistantId");

  if (!id)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    //Invoke the delete assistant endpoint of the OpenAI API
    const response = await openai.beta.assistants.del(id);

    console.log(response);

    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}