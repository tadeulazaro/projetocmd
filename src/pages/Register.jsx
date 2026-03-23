import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser({ name, email, password });
      navigate("/login?registered=1");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-cyan-700 to-purple-900 p-4">
      <header className="w-full flex flex-col items-center justify-center pt-8 pb-2">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight select-none">CashPilot</span>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 mt-6 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyan-800 mb-2 text-center tracking-tight">Criar Conta</h2>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
          <input
            type="text"
            placeholder="Nome"
            className="border border-cyan-200 rounded pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800 bg-white"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
          <input
            type="email"
            placeholder="E-mail"
            className="border border-cyan-200 rounded pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800 bg-white"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
          <input
            type="password"
            placeholder="Senha"
            className="border border-cyan-200 rounded pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800 bg-white"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition disabled:opacity-60 text-lg tracking-wide"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
        <a href="/login" className="text-cyan-700 hover:underline text-center font-medium">Já tem conta? Entrar</a>
      </form>
    </div>
  );
}
