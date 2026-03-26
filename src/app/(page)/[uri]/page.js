import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import LinkWithTracking from "@/components/LinkWithTracking";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Link from "next/link";
import { notFound } from "next/navigation";
export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};
function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}
export default async function UserPage({ params }) {
  const { uri: rawUri } = await params;
  const uri = rawUri?.toLowerCase();
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  if (!page) {
    return notFound();
  }
  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri: uri, page: uri, type: "view" });
  const buttons =
    page?.buttons && typeof page.buttons === "object" ? page.buttons : {};
  const links = Array.isArray(page?.links) ? page.links : [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div
        className="h-40 bg-gradient-to-b from-purple-400 via-pink-400 to-slate-100 bg-cover bg-center relative overflow-hidden"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="aspect-square w-32 h-32 mx-auto relative -top-16 -mb-8 z-10">
        <div className="rounded-full w-full h-full object-cover ring-4 ring-white shadow-xl overflow-hidden bg-slate-200">
          <img
            className="w-full h-full object-cover"
            src={user.image}
            alt="avatar"
            width={256}
            height={256}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="px-6 text-center pb-8">
        <h2 className="text-3xl font-poppins font-bold text-slate-900 mb-2 gradient-text">
          {page.displayName}
        </h2>
        <h3 className="text-sm flex gap-2 justify-center items-center text-slate-600 font-medium mb-4">
          <FontAwesomeIcon className="h-4" icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>
        <div className="max-w-md mx-auto text-center mb-6">
          <p className="text-slate-700 leading-relaxed">{page.bio}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-center pb-8 px-4 flex-wrap">
        {Object.keys(buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, buttons[buttonKey])}
            className="rounded-full bg-white border border-slate-200 text-slate-700 p-3 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200 transition-all hover:scale-110"
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4 p-6 px-4 pb-12">
        {links.map((link) => (
          <LinkWithTracking key={link.url} link={link} pageUri={page.uri} />
        ))}
      </div>
    </div>
  );
}
