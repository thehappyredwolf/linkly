"use client";
import { grabUsername } from "@/actions/grabUsername";
import SubmitButton from "@/components/buttons/SubmitButton";
import RightIcon from "@/components/icons/RightIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UsernameForm({ desiredUsername }) {
  const router = useRouter();
  const [taken, setTaken] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData) {
    const result = await grabUsername(formData);
    if (!result?.ok) {
      setTaken(true);
      setMessage(result?.message || "Could not create username");
      return;
    }

    setTaken(false);
    setMessage("");
    router.push("/account?created=" + encodeURIComponent(result.username));
  }

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className="block p-2 mx-auto border w-full mb-2 text-center"
          defaultValue={desiredUsername}
          type="text"
          placeholder="username"
        />
        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
            {message || "This username is taken"}
          </div>
        )}
        <SubmitButton>
          <span>Claim your username</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
}
