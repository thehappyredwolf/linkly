"use server";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
export async function grabUsername(username) {
  mongoose.connect(process.env.MONGO_URI);
  const existingPage = await Page.findOne({ uri: username });
  if (existingPage) {
    return { ok: false, message: "Username is taken" };
  }
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");
  const session = await getServerSession(authOptions);
  if (!session) {
    return { ok: false, message: "Not authenticated" };
  }
  try {
    const newPage = await Page.create({
      uri: username,
      owner: session.user.email,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: "Error creating page" };
  }
}
