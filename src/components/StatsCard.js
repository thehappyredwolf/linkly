import { Event } from "@/models/Event";
import mongoose from "mongoose";
import { faMouse, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function StatsCard({ pageUri, linksCount }) {
  mongoose.connect(process.env.MONGO_URI);

  const totalViews = await Event.countDocuments({
    type: "view",
    uri: pageUri,
  });

  const totalClicks = await Event.countDocuments({
    type: "click",
    page: pageUri,
  });

  const stats = [
    {
      label: "Views",
      value: totalViews,
      icon: faEye,
      color: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Clicks",
      value: totalClicks,
      icon: faMouse,
      color: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Links",
      value: linksCount,
      icon: faLink,
      color: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all`}
          style={{
            animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center ${stat.iconColor}`}
            >
              <FontAwesomeIcon icon={stat.icon} className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
