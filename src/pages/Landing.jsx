export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4 text-center">Controle de Despesas</h1>
        <p className="text-gray-600 text-lg mb-6 text-center">
          Organize sua vida financeira de forma simples e moderna.<br/>
          Cadastre despesas, receitas, visualize gráficos e entenda para onde vai seu dinheiro.
        </p>
        <ul className="text-left text-gray-700 mb-6 space-y-2">
          <li>• Cadastro e login seguro</li>
          <li>• Dashboard com entradas, saídas e saldo</li>
          <li>• Gráficos de desempenho e análises</li>
          <li>• Responsivo para desktop e celular</li>
        </ul>
        <a href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition">
          Começar agora
        </a>
        <a href="/login" className="mt-4 text-indigo-600 hover:underline">Já tenho conta</a>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">Projeto exemplo • {new Date().getFullYear()}</footer>
    </div>
  );
}
