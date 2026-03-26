"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function LinkWithTracking({ link, pageUri }) {
  async function handleClick() {
    try {
      const encodedUrl = btoa(link.url);
      const response = await fetch(
        `/api/click?url=${encodedUrl}&page=${pageUri}`,
        { method: "POST" },
      );
      console.log("Click tracked successfully:", response.ok);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  }

  return (
    <Link
      key={link.url}
      target="_blank"
      onClick={handleClick}
      className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 block flex flex-col gap-3 transition-all hover:shadow-md hover:shadow-purple-200 hover:-translate-y-1"
      href={link.url}
    >
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
          {link.icon && (
            <img
              className="w-full h-full object-cover"
              src={link.icon}
              alt="icon"
              width={64}
              height={64}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          )}
          {!link.icon && (
            <FontAwesomeIcon
              icon={faLink}
              className="w-5 h-5 text-purple-600"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate text-sm">
            {link.title}
          </h3>
          <p className="text-slate-600 text-xs h-5 overflow-hidden">
            {link.subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 group-hover:border-slate-200">
        <span className="text-xs text-slate-500 group-hover:text-slate-700">
          Click to visit →
        </span>
      </div>
    </Link>
  );
}
