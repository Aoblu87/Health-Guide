import connectionDB from "@/lib/connectionDB";
import User from "@/models/User";
import cloudinary from "cloudinary";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

//Get user by ID
export async function GET(request: NextRequest,{params}:{params:{id:string}}){
await connectionDB();
try {
  const id= params.id;
  const user = await User.findById({ _id: id }).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
} catch (error:any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
  
}

}


//Route for modifying a user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectionDB();
  try {
    const reqBody = await request.json();
    //Takes parameters from the URL
    const id = params.id;
    //Find the user in the database based on the user ID
    const updateUser = await User.findByIdAndUpdate(id, reqBody, {
      new: true,
    }).select("-password");

    if (!updateUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updateUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectionDB();
  try {
    const reqBody = await request.json();
    const id = params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else {
      return NextResponse.json({ message: "User deleted" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PATCH(
      request: NextRequest,
      { params }: { params: { id: string } }
    ) {
      await connectionDB();
    try {
        const reqBody = await request.json();
              const id = params.id;
              const file = multer(reqBody).single("photo");
            //   const file = uploadFile.single("photo")
              const addAvatar = await User.findByIdAndUpdate(
                id,
                { photo: "ciao" },
                { new: true }
            )

            if (!addAvatar) {
               return NextResponse.json({ error: "User not found" }, { status:400})
            } else {
                NextResponse.json(addAvatar)
            }

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status:500})
        
    }
    
    }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectionDB();

//   try {
//       //Takes parameters from the URL
//       const id = params.id;
//       const reqBody = await request.json();
//       const parse= JSON.parse(reqBody);
//       console.log(parse)
//     const formData = await reqBody.formData();
//     const file = formData.get("file");
//     console.log("Request Data:", JSON.stringify(reqBody));

// // Check if a file is received
// if (!file) {
//     // If no file is received, return a JSON response with an error and a 400 status code
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }
//   // Convert the file data to a Buffer
//   const buffer = Buffer.from(await file.arrayBuffer());

//   // Replace spaces in the file name with underscores
//   const photo = file.name.replaceAll(" ", "_");
//   console.log(photo);
//     // Write the file to the specified directory (public/assets) with the modified filename
//     await writeFile(
//       path.join(process.cwd(), "public/assets/" + photo),
//       buffer
//     );

  
//     const { dataString, filename, code } = reqBody.body;
//     console.log(dataString);
// //Send data to cloudinary
//     const result = await cloudinary.v2.uploader.upload(dataString, {
//       upload_preset: `krakendata_logo`,
//       public_id: filename.toLowerCase().replaceAll(" ", "-"),
//     });
//     if(!result){
//         NextResponse.json({ message: "File not uploaded to cloudinary" }, { status: 400 });
//     }
//     const cleanData=JSON.parse(JSON.stringify(result))

// // const newResult= JSON.stringify(result);
//     //Find the user in the database based on the user ID and update photo
//     const updateUserWithPhoto =await  User.findByIdAndUpdate(id, {
//       photo: `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${cleanData.public_id}`,
//     },{new:true}).select("-password");

   

//     if (!updateUserWithPhoto) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json(updateUserWithPhoto, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// export async function  PATCH(
//     request: NextRequest,
//     { params }: { params: { id: string } }
//   ) {
//     await connectionDB();
//     const reqBody= await request.json();

//     const id = params.id;
//     console.log(id)

//     if (reqBody.files.length > 0) {
//       const uploader = async (path:any) => await uploads(path, "health-guide");

//       const file = reqBody.files[0];
//       const { path } = file;

//       const avatarResponse = await uploader(path);
//       fs.unlinkSync(path);
//     }

//     const user = await User.findByIdAndUpdate(id, {avatar: reqBody.file});

//     NextResponse.json(user, { status: 200 });

//   };