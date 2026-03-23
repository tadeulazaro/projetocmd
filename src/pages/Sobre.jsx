

import React from "react";
import { FaChartPie, FaBell, FaLock, FaRocket, FaMobileAlt } from "react-icons/fa";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

export default function Sobre() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-700 to-purple-900 flex flex-col items-center justify-center px-4">
      {/* LOGO E NOME */}
      <header className="w-full flex flex-col items-center justify-center pt-8 pb-2">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight select-none">CashPilot</span>
        </div>
      </header>
      {/* HERO SECTION */}
      <section className="w-full max-w-3xl text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-pulse">
          Pare de perder dinheiro.<br />
          <span className="text-cyan-400">Controle suas despesas</span> de verdade.
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
          O app financeiro que te mostra para onde seu dinheiro vai, te ajuda a economizar e faz você conquistar seus objetivos.
        </p>
        <Link to="/register" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200 animate-bounce">
          Comece agora grátis
        </Link>
      </section>

      {/* BENEFITS CARDS */}
      <section id="comece" className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-16">
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-8 flex flex-col items-center shadow-2xl border-2 border-cyan-400 hover:scale-105 transition-transform">
          <FaChartPie className="text-cyan-400 text-4xl mb-3 animate-pulse" />
          <h2 className="text-xl font-bold text-white mb-2">Veja tudo</h2>
          <p className="text-gray-300">Gráficos, relatórios e extratos claros. Saiba exatamente para onde vai cada centavo.</p>
        </div>
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-8 flex flex-col items-center shadow-2xl border-2 border-cyan-400 hover:scale-105 transition-transform">
          <FaBell className="text-cyan-400 text-4xl mb-3 animate-bounce" />
          <h2 className="text-xl font-bold text-white mb-2">Receba alertas</h2>
          <p className="text-gray-300">Metas, limites e avisos automáticos para você nunca mais estourar o orçamento.</p>
        </div>
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-8 flex flex-col items-center shadow-2xl border-2 border-cyan-400 hover:scale-105 transition-transform">
          <FaLock className="text-cyan-400 text-4xl mb-3 animate-spin" />
          <h2 className="text-xl font-bold text-white mb-2">Segurança total</h2>
          <p className="text-gray-300">Seus dados protegidos com criptografia e backup automático. Privacidade garantida.</p>
        </div>
      </section>

      {/* EXTRAS */}
      <section className="w-full max-w-3xl text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-cyan-700 mb-4">Sua vida financeira, <span className="text-cyan-400">mais leve</span> e no <span className="text-purple-400">controle</span></h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          <div className="flex-1 flex flex-col items-center">
            <FaRocket className="text-cyan-500 text-4xl mb-2 animate-bounce" />
            <p className="text-lg md:text-2xl text-cyan-100 mb-6 font-medium">Automatize lançamentos e economize tempo</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <FaMobileAlt className="text-cyan-500 text-4xl mb-2 animate-pulse" />
            <p className="text-base md:text-lg text-cyan-200 mb-4">Use no celular, tablet ou computador</p>
          </div>
        </div>
      </section>
      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
