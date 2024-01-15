import { NextRequest } from "next/server";
import OpenAI from "openai";

//GET thread by id
export async function GET(request:NextRequest){
const searchParams= request.nextUrl.searchParams;
const threadId= searchParams.get("threadId");
if(!threadId){
    return Response.json({error:"No threadId provided"},{status:400});
}
const openai = new OpenAI();
try {
    const myThread = await openai.beta.threads.retrieve(threadId);
    
    console.log(myThread);
    
} catch (error:any) {
    return Response.json({ error: error.message });
}

}

//RESPONSE
// {
//     "id": "thread_abc123",
//     "object": "thread",
//     "created_at": 1699014083,
//     "metadata": {}
//   }
  