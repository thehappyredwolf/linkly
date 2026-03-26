"use server";

import { Page } from "@/models/Page";
import mongoose from "mongoose";

export async function savePageSettings(data) {
  mongoose.connect(process.env.MONGO_URI);

  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");

  const session = await getServerSession(authOptions);

  if (session) {
    // Update the page settings
    const dataToUpdate = {
      displayName: data.displayName,
      bio: data.bio,
      location: data.location,
      backgroundType: data.backgroundType,
      backgroundColor: data.backgroundColor,
      backgroundImage: data.backgroundImage,
      avatar: data.avatar,
    };

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
    return true;
  }
  return false;
}

export async function savePageButtons(buttons) {
  mongoose.connect(process.env.MONGO_URI);

  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");

  const session = await getServerSession(authOptions);

  if (session) {
    const buttonsValues = buttons.map((button) => ({
      id: button.id,
      label: button.label,
      url: button.url,
      icon: button.icon,
      color: button.color,
    }));

    const dataToUpdate = { buttons: buttonsValues };
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
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
  } else {
    return false;
  }
}
