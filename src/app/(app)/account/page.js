import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";
export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const desiredUsername = resolvedSearchParams?.desiredUsername;
  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  const leanPage = cloneDeep(page?.toJSON?.() || {});
  if (leanPage._id) leanPage._id = leanPage._id.toString();
  if (!leanPage.buttons || typeof leanPage.buttons !== "object")
    leanPage.buttons = {};
  if (!Array.isArray(leanPage.links)) leanPage.links = [];
  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
