"use client";

import RegisterForm from "@/components/forms/RegistroForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-blue-600">
      <RegisterForm />
    </div>
  );
}
