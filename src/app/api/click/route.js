import { Event } from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get("url"));
    const page = url.searchParams.get("page");

    console.log("Click tracked:", { clickedLink, page });
    await Event.create({ type: "click", uri: clickedLink, page });
    console.log("Click saved to database");
    return Response.json(true);
  } catch (error) {
    console.error("Click tracking error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
