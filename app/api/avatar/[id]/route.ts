
import connectionDB from "@/lib/connectionDB";
import uploadFile from "@/lib/uploadFile";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  await connectionDB();
  const id = params.id;
 
  uploadFile.single("avatar")
 
const reqBody = await req.json();
    const file = reqBody.file;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
const user = await User.findByIdAndUpdate(id, { avatar: file.filename }, { new:true})
      // Update the user with the file information
      return NextResponse.json(user, { status: 200 });
    
  }

// import { NextApiRequest, NextApiResponse } from "next"
// import cloudinary from "cloudinary"
// import clientPromise from "../../utils/mongodb"

// cloudinary.v2.config({
//   cloud_name: config.server.cloudinary_name,
//   api_secret: config.server.cloudinary_api_secret,
//   api_key: config.server.cloudinary_api_key
// })
// // eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { method } = req
//     if (method !== "POST") {
//       res.status(400).json({ message: "Not allowed" })
//     } else {
//       const { dataString, filename, code } = req.body

//       const result = await cloudinary.v2.uploader.upload(dataString, {
//         upload_preset: `krakendata_logo`,
//         public_id: filename.toLowerCase().replaceAll(" ", "-")
//       })
//       //save in db
//       let date = new Date().toISOString()
//       const db = (await clientPromise).db(process.env.MONGO_NAME)

//       const data = await db.collection(config.server.colLinkUrl).updateOne(
//         { currency_long: filename },
//         {
//           $set: {
//             currency_code: code,
//             currency_long_strip: filename.toLowerCase().replaceAll(" ", "-"),
//             link: `https://res.cloudinary.com/${config.server.cloudinary_name}/image/upload/${result.public_id}`,
//             addedAt: date
//           }
//         },
//         {
//           upsert: true
//         }
//       )

//       const newFile = {
//         currency_code: code,
//         currency_long_strip: filename.toLowerCase().replaceAll(" ", "-"),
//         link: `https://res.cloudinary.com/${config.server.cloudinary_name}/image/upload/${result.public_id}`,
//         addedAt: date,
//         currency_long: filename
//       }

//       res.status(200).json({
//         message: "Insert succeed",
//         link: result.public_id,
//         url: `https://res.cloudinary.com/${config.server.cloudinary_name}/image/upload/${result.public_id}`,
//         insertFile: newFile
//       })
//     }
//   } catch (error) {
//     console.error(error)
//     return res.status(500).end(error)
//   }
// }