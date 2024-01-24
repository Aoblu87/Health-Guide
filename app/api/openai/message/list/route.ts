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


//ENDPOINT
// http://localhost:3000/api/openai/message/list?threadId=thread_OzapNbUDhBfkeBykYCw77PXn

//RESPONSE
// {
//   "messages": [
//       {
//           "id": "msg_SHKkEP4kUOE2WZKajgOT2N6o",
//           "object": "thread.message",
//           "created_at": 1705228612,
//           "thread_id": "thread_LVPyObR6tZRx68UgEU2102fE",
//           "role": "assistant",
//           "content": [
//               {
//                   "type": "text",
//                   "text": {
//                       "value": "Imagine you have a big box of crayons with lots of different colors, and I ask you to sort them all out. At first, you might not know which colors are which, but if I show you that \"this is red\" and \"this is blue,\" you'll start putting the right colors in the right places. \n\nDeep learning is like teaching a computer to sort crayons, but instead of colors, it is learning patterns from lots of examples. When we show it many pictures of cats, it starts to see what makes a cat a cat, like having whiskers and pointy ears, so later on, when it sees a new picture, it can say, \"Hey, that's a cat!\" \n\nThe computer uses something called \"neural networks,\" which are like tiny make-believe brains, and these get better and better at recognizing things the more they practice, just like you get better at sorting crayons the more you do it. Isn’t that cool?",
//                       "annotations": []
//                   }
//               }
//           ],
//           "file_ids": [],
//           "assistant_id": "asst_KOVip2WaLZUUk4fLnrm0FGrN",
//           "run_id": "run_cOl60SjxRkodvchHm0oM8CD9",
//           "metadata": {}
//       },
//       {
//           "id": "msg_5ThOQ3QbZeoMEUf9D3eUD0Gz",
//           "object": "thread.message",
//           "created_at": 1705228611,
//           "thread_id": "thread_LVPyObR6tZRx68UgEU2102fE",
//           "role": "user",
//           "content": [
//               {
//                   "type": "text",
//                   "text": {
//                       "value": "Explain deep learning to a 5 year old",
//                       "annotations": []
//                   }
//               }
//           ],
//           "file_ids": [],
//           "assistant_id": null,
//           "run_id": null,
//           "metadata": {}
//       }
//   ]
// }