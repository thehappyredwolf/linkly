import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  if (!page) {
    return redirect("/account");
  }

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <SectionBox>
        <div className="mb-8">
          <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-2">
            Page Views
          </h2>
          <p className="text-slate-600">
            Track how many people visit your page
          </p>
        </div>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <div className="mb-8">
          <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-2">
            Link Performance
          </h2>
          <p className="text-slate-600">See which links get the most clicks</p>
        </div>
        <div className="space-y-4">
          {page.links.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faLink} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">
                  {link.title || "Untitled"}
                </h3>
                <p className="text-sm text-slate-500 truncate">
                  {link.subtitle || "No description"}
                </p>
                <a
                  className="text-xs text-purple-600 hover:text-purple-700 truncate inline-block"
                  target="_blank"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">
                    {
                      clicks.filter(
                        (c) => c.uri === link.url && isToday(c.createdAt),
                      ).length
                    }
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    today
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">
                    {clicks.filter((c) => c.uri === link.url).length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    total
                  </div>
                </div>
              </div>
            </div>
          ))}
          {page.links.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No links added yet</p>
            </div>
          )}
        </div>
      </SectionBox>
    </div>
  );
}
