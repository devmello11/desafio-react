"use client";

import RegisterForm from "@/components/RegisterForm";
import React, { useEffect } from "react";
import GlobalLoading from "@/components/GlobalLoading";

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-indigo-600">
      {loading && <GlobalLoading />}
      {!loading && <RegisterForm />}
    </div>
  );
}
