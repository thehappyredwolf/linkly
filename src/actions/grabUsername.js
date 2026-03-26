"use server";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
export async function grabUsername(input) {
  mongoose.connect(process.env.MONGO_URI);
  const username =
    typeof input === "string" ? input : input?.get?.("username")?.toString();
  const normalizedUsername = username?.trim();

  if (!normalizedUsername) {
    return { ok: false, message: "Username is required" };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(normalizedUsername)) {
    return {
      ok: false,
      message: "Username can only contain letters, numbers, _ and -",
    };
  }

  const existingPage = await Page.findOne({ uri: normalizedUsername });
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
      uri: normalizedUsername,
      owner: session.user.email,
    });
    return { ok: true, username: newPage.uri };
  } catch (err) {
    return { ok: false, message: "Error creating page" };
  }
}
