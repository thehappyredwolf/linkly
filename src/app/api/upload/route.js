import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  if (formData.has("file")) {
    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });
    return Response.json(uploadResult.secure_url);
  }
}
