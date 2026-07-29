"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface EmailInputProps {
  buttonLabel?: string;
  showLabel?: boolean;
}

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function EmailInput({
  buttonLabel = "Get early access",
  showLabel = false,
}: EmailInputProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setStatus("loading");

    const { error: supabaseError } = await supabase
      .from("waitlist")
      .insert({ email: email.trim().toLowerCase() });

    if (!supabaseError) {
      setStatus("success");
      setEmail("");
      return;
    }

    if (supabaseError.code === "23505") {
      setStatus("duplicate");
      return;
    }

    console.error("Waitlist insert failed:", supabaseError);
    setStatus("error");
    setError("Something went wrong — please try again");
  };

  const showForm =
    status === "idle" || status === "loading" || status === "error";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-2">
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#FFFDF8] border border-[#E2D9C4] text-[#22281F] placeholder:text-[#A89A83] focus:outline-none focus:ring-2 focus:ring-[#1F3D2E]/30 transition font-sans disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-[#1F3D2E] text-[#FFFDF8] rounded-2xl font-medium hover:scale-105 active:scale-95 transition-transform whitespace-nowrap disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? "Joining…" : buttonLabel}
            </button>
          </motion.div>
        ) : status === "duplicate" ? (
          <motion.div
            key="duplicate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="py-3 text-center"
          >
            <p className="text-[#1F3D2E] font-medium">
              You&apos;re already on the list.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="py-3 text-center"
          >
            <p className="text-[#1F3D2E] font-medium">
              You&apos;re in. We&apos;ll reach out when it&apos;s ready.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-[#B4633E]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
