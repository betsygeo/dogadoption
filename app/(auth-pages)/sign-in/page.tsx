"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: "betsygeo34@gmail.com",
      password: password, //Adopt123
    });

    if (error) {
      setError("Incorrect password. Please try again.");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div>
      <h1>Enter the Password to Adopt a Dog</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
