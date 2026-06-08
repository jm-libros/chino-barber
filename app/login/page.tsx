"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#120000] border border-red-900 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-[#D4AF37] mb-2">
          CHINO BARBER
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Panel de Administración
        </p>

        <div className="grid gap-4">

          <input
            type="email"
            placeholder="Correo administrador"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              p-4
              rounded-lg
              bg-black
              border
              border-red-900
              text-white
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              p-4
              rounded-lg
              bg-black
              border
              border-red-900
              text-white
              outline-none
            "
          />

          <button
            onClick={login}
            disabled={loading}
            className="
              bg-[#8B0000]
              hover:bg-[#B22222]
              transition
              p-4
              rounded-lg
              font-bold
              text-white
            "
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </div>

      </div>
    </main>
  );
}