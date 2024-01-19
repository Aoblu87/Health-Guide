import { IncomingForm } from "formidable";
import { createReadStream } from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST (request: NextRequest, res: NextResponse) {
  console.log("Upload runnin");
  const reqBody = await request.json();

  const form = new IncomingForm();

  form.parse(reqBody, async (err, fields, files) => {
    if (err) {
      
      return NextResponse.json({ error: err.message }, { status: 500 });
      
    }

    try {
      const fileArray = Array.isArray(files.file) ? files.file : [files.file];
      const file = fileArray[0];

      if (!file) {
      return NextResponse.json({ error: "No file uploaded"}, { status: 400 });

      }

      // Create a ReadStream from the file
      const fileStream = createReadStream(file.filepath);

      const openai = new OpenAI();
      const response = await openai.files.create({
        file: fileStream, // Use the ReadStream for uploading
        purpose: "assistants",
      });
NextResponse.json({ file: response }, { status: 200 })
    } catch (e:any) {
      return NextResponse.json({ error: e.message }, { status: 500 });
     
    }
  });
}

