"use client";

import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CopyUrlButton({ username }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/${username}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-300 transition-all hover:scale-105"
    >
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4 h-4" />
      <span>{copied ? "Copied!" : "Copy Link"}</span>
    </button>
  );
}
