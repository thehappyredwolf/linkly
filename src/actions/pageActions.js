"use server";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");
  const session = await getServerSession(authOptions);
  if (session) {
    const displayName = formData?.get?.("displayName")?.toString() ?? "";
    const bio = formData?.get?.("bio")?.toString() ?? "";
    const location = formData?.get?.("location")?.toString() ?? "";
    const bgType = formData?.get?.("bgType")?.toString() ?? "color";
    const bgColor = formData?.get?.("bgColor")?.toString() ?? "#000";
    const bgImage = formData?.get?.("bgImage")?.toString() ?? "";
    const avatar = formData?.get?.("avatar")?.toString() ?? "";

    const dataToUpdate = {
      displayName,
      bio,
      location,
      bgType,
      bgColor,
      bgImage,
    };

    console.log("Server saving:", { bgImage, avatar, displayName });
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

    if (avatar) {
      await User.updateOne({ email: session?.user?.email }, { image: avatar });
    }
    revalidatePath("/account");
    return true;
  }
  return false;
}
export async function savePageButtons(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");
  const session = await getServerSession(authOptions);
  if (session) {
    const buttons = {};
    for (const [key, value] of formData.entries()) {
      const stringValue = value?.toString?.().trim?.() ?? "";
      if (stringValue) {
        buttons[key] = stringValue;
      }
    }

    await Page.updateOne({ owner: session?.user?.email }, { buttons });
    revalidatePath("/account");
    return true;
  }
  return false;
}
export async function savePageLinks(links) {
  mongoose.connect(process.env.MONGO_URI);
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne({ owner: session?.user?.email }, { links });
    revalidatePath("/account");
    return true;
  } else {
    return false;
  }
}
