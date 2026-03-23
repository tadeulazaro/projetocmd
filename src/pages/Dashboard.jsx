import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { FaSignOutAlt, FaPlus, FaArrowUp, FaArrowDown, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

// Mensagem de erro amigável para gráficos
function ChartError({ message }) {
  return (
    <div className="bg-red-100 text-red-700 rounded-lg p-4 text-center font-bold my-4">
      Erro ao carregar gráfico: {message || "Verifique o Chart.js ou recarregue a página."}
    </div>
  );
}

export default function Dashboard() {
    const [dueDate, setDueDate] = useState("");
  // --- State ---
  const [chartError, setChartError] = useState("");
  const [activeTab, setActiveTab] = useState("geral");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("saida");
  const [expenseDate, setExpenseDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [user, setUser] = useState({ name: localStorage.getItem("name") || "Usuário" });
  const [expenseCategory, setExpenseCategory] = useState("");
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : ["Alimentação", "Transporte", "Lazer", "Saúde", "Outros"];
  });
  const [editId, setEditId] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState("all");
  const [toast, setToast] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  // --- Calculations ---
  const filteredExpenses = expenses.filter(e => {
    const d = new Date(e.date || Date.now());
    const matchesType = filterType === "all" || e.type === filterType;
    const matchesMonth = d.getMonth() + 1 === Number(month);
    const matchesYear = d.getFullYear() === Number(year);
    return matchesType && matchesMonth && matchesYear;
  });
  const entradas = filteredExpenses.filter(e => e.type === "entrada").reduce((acc, e) => acc + e.amount, 0);
  const saidas = filteredExpenses.filter(e => e.type === "saida").reduce((acc, e) => acc + e.amount, 0);
  const saldo = entradas - saidas;

  // --- Handlers ---
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }
  function handleAddExpense(e) {
    e.preventDefault();
    if (!desc || !amount || isNaN(Number(amount)) || !expenseDate || (type === "saida" && !dueDate)) return;
    if (editId) {
      // Editar despesa existente, atualizando a data
      const updated = expenses.map(exp =>
        exp.id === editId
          ? { ...exp, desc, amount: Number(amount), type, category: expenseCategory, date: expenseDate, dueDate: type === "saida" ? dueDate : undefined }
          : exp
      );
      setExpenses(updated);
      setEditId(null);
    } else {
      // Nova despesa
      const newExpenses = [
        ...expenses,
        { desc, amount: Number(amount), type, category: expenseCategory, id: Date.now(), date: expenseDate, dueDate: type === "saida" ? dueDate : undefined }
      ];
      setExpenses(newExpenses);
    }
    setDesc("");
    setAmount("");
    setType("saida");
    setExpenseCategory("");
    setExpenseDate(new Date().toISOString().slice(0, 10));
    setDueDate("");
  }
  function handleEdit(exp) {
    const found = expenses.find(item => item.id === exp.id);
    if (!found) return;
    setEditId(Number(found.id));
    setDesc(found.desc);
    setAmount(String(found.amount));
    setType(found.type);
    setExpenseCategory(found.category || "");
    setDueDate(found.dueDate || "");
    const d = new Date(found.date);
    setMonth(d.getMonth() + 1);
    setYear(d.getFullYear());
    setFilterType("all");
    setToast("Modo de edição ativado!");
    setTimeout(() => setToast(""), 1500);
  }
  function handleDelete(id) {
    setExpenses(expenses.filter(e => e.id !== id));
  }
  function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategory.trim() || categories.includes(newCategory.trim())) return;
    const updated = [...categories, newCategory.trim()];
    setCategories(updated);
    setNewCategory("");
    setShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updated));
  }
  function handleRemoveCategory(cat) {
    const updated = categories.filter(c => c !== cat);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    setExpenses(expenses.map(e => e.category === cat ? { ...e, category: "" } : e));
  }

  // --- Persistência ---
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-cyan-700 to-purple-900">
      {/* Header padronizado */}
      <header className="w-full bg-white/90 shadow-lg flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
          <Logo />
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight select-none">CashPilot</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-gray-700 font-semibold text-base sm:text-lg">Olá, {user.name}</span>
          <button onClick={handleLogout} className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg transition text-base sm:text-lg">
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10 relative">
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-lg font-bold animate-fade-in-out">
            {toast}
          </div>
        )}
        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-4 flex-wrap">
          <button onClick={() => setActiveTab("geral")} className={`px-3 sm:px-4 py-2 rounded-t-lg font-bold border-b-2 text-sm sm:text-base ${activeTab === "geral" ? "border-cyan-500 bg-white text-cyan-800" : "border-transparent bg-cyan-100 text-cyan-500"}`}>Visão Geral</button>
          <button onClick={() => setActiveTab("resumo")} className={`px-3 sm:px-4 py-2 rounded-t-lg font-bold border-b-2 text-sm sm:text-base ${activeTab === "resumo" ? "border-cyan-500 bg-white text-cyan-800" : "border-transparent bg-cyan-100 text-cyan-500"}`}>Resumo Detalhado</button>
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "geral" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {/* Card Saldo Destacado */}
              <div className="bg-gradient-to-br from-cyan-400 via-white to-purple-400 rounded-2xl shadow p-3 flex flex-col items-center border border-cyan-200 min-h-[80px]">
                <span className="text-gray-700 font-semibold text-base z-10">Saldo</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-700 via-purple-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg z-10">R$ {saldo.toFixed(2)}</span>
              </div>
              {/* Card Entradas */}
              <div className="bg-gradient-to-br from-green-200 via-white to-green-400 rounded-2xl shadow p-3 flex flex-col items-center border border-green-200 min-h-[80px]">
                <FaArrowUp className="text-green-600 text-2xl mb-1 drop-shadow" />
                <span className="text-green-800 font-bold text-base mb-0.5">Entradas</span>
                <span className="text-xl font-extrabold text-green-700">R$ {entradas.toFixed(2)}</span>
              </div>
              {/* Card Saídas */}
              <div className="bg-gradient-to-br from-red-200 via-white to-red-400 rounded-2xl shadow p-3 flex flex-col items-center border border-red-200 min-h-[80px]">
                <FaArrowDown className="text-red-600 text-2xl mb-1 drop-shadow" />
                <span className="text-red-800 font-bold text-base mb-0.5">Saídas</span>
                <span className="text-xl font-extrabold text-red-700">R$ {saidas.toFixed(2)}</span>
              </div>
              {/* Card Total Ano */}
              <div className="bg-gradient-to-br from-purple-200 via-white to-cyan-200 rounded-2xl shadow p-3 flex flex-col items-center border border-purple-200 min-h-[80px]">
                <span className="text-purple-800 font-bold text-base mb-0.5">Total no Ano</span>
                <span className="text-xl font-extrabold text-purple-700">R$ {expenses.filter(e => new Date(e.date).getFullYear() === Number(year)).reduce((acc, e) => acc + e.amount, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "resumo" && (
          <>

        {/* Resumo por tipo de despesa */}
          <div className="bg-white/90 rounded-xl shadow p-3 mb-4 border border-cyan-100">
            <h3 className="text-cyan-800 font-bold text-base mb-2">Soma por Tipo de Despesa ({month.toString().padStart(2,'0')}/{year})</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const total = expenses.filter(e => e.category === cat && new Date(e.date).getMonth() + 1 === Number(month) && new Date(e.date).getFullYear() === Number(year)).reduce((acc, e) => acc + e.amount, 0);
                if (!total) return null;
                return (
                  <span key={cat} className="bg-cyan-100 text-cyan-800 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shadow-sm">
                    {cat}: <span className="font-bold">R$ {total.toFixed(2)}</span>
                  </span>
                );
              })}
            </div>
          </div>

        {/* Resumo mensal do ano */}
          <div className="bg-white/90 rounded-xl shadow p-3 mb-4 border border-cyan-100">
            <h3 className="text-cyan-800 font-bold text-base mb-2">Resumo Mensal ({year})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[400px] w-full text-center text-xs">
                <thead>
                  <tr className="text-cyan-700">
                    <th className="py-0.5">Mês</th>
                    <th className="py-0.5">Entradas</th>
                    <th className="py-0.5">Saídas</th>
                    <th className="py-0.5">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length:12}, (_,i) => {
                    const monthNum = i+1;
                    const entradasMes = expenses.filter(e => e.type === "entrada" && new Date(e.date).getMonth() + 1 === monthNum && new Date(e.date).getFullYear() === Number(year)).reduce((acc, e) => acc + e.amount, 0);
                    const saidasMes = expenses.filter(e => e.type === "saida" && new Date(e.date).getMonth() + 1 === monthNum && new Date(e.date).getFullYear() === Number(year)).reduce((acc, e) => acc + e.amount, 0);
                    const totalMes = entradasMes - saidasMes;
                    return (
                      <tr key={monthNum} className="border-b last:border-b-0">
                        <td className="py-0.5 font-semibold">{monthNum.toString().padStart(2,'0')}</td>
                        <td className="py-0.5 text-green-700">R$ {entradasMes.toFixed(2)}</td>
                        <td className="py-0.5 text-red-700">R$ {saidasMes.toFixed(2)}</td>
                        <td className={"py-0.5 font-bold " + (totalMes >= 0 ? "text-green-800" : "text-red-800")}>R$ {totalMes.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}
        {/* Filtros só aparecem na aba geral */}
        {activeTab === "geral" && (
          <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow border border-cyan-200">
              <FaFilter className="text-cyan-400" />
              <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-transparent outline-none px-2 py-1">
                <option value="all">Todos</option>
                <option value="entrada">Entradas</option>
                <option value="saida">Saídas</option>
              </select>
            </div>
            <select value={month} onChange={e => setMonth(e.target.value)} className="bg-white/80 rounded-lg px-3 py-2 shadow border border-cyan-200">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{(i + 1).toString().padStart(2,'0')}</option>
              ))}
            </select>
            <select value={year} onChange={e => setYear(e.target.value)} className="bg-white/80 rounded-lg px-3 py-2 shadow border border-cyan-200">
              {Array.from({length:5}, (_,i)=>(<option key={i} value={2024+i}>{2024+i}</option>))}
            </select>
          </div>
        )}
                {/* Gráfico de pizza no resumo detalhado */}
                {activeTab === "resumo" && (
                  <>
                    {chartError && <ChartError message={chartError} />}
                    <div className="bg-white/90 rounded-xl shadow p-6 mb-6 border border-cyan-100 flex flex-col items-center">
                      <h3 className="text-cyan-800 font-bold text-lg mb-4">Distribuição das Despesas por Categoria</h3>
                      <div className="w-full max-w-xs md:max-w-md">
                        <canvas id="pieChartResumo" width="320" height="320"></canvas>
                      </div>
                    </div>
                    <div className="bg-white/90 rounded-xl shadow p-6 mb-6 border border-cyan-100 flex flex-col items-center">
                      <h3 className="text-cyan-800 font-bold text-lg mb-4">Despesas por Categoria (Barra)</h3>
                      <div className="w-full max-w-xs md:max-w-md">
                        <canvas id="barChartResumo" width="320" height="320"></canvas>
                      </div>
                    </div>
                  </>
                )}


        {/* Formulário de nova despesa */}
        {/* Formulário de nova despesa */}
        {activeTab === "geral" && (
          <form onSubmit={handleAddExpense} className="bg-white/90 rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10 border-2 border-cyan-200" autoComplete="off">
            <input
              type="text"
              placeholder="Descrição"
              className="border border-cyan-200 rounded px-2 sm:px-3 py-2 flex-1 min-w-[120px] sm:min-w-[160px] focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
              required
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor"
              className="border border-cyan-200 rounded px-2 sm:px-3 py-2 w-20 sm:w-24 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <select value={type} onChange={e => setType(e.target.value)} className="border border-cyan-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base">
              <option value="saida">Saída</option>
              <option value="entrada">Entrada</option>
            </select>
            <input
              type="date"
              className="border border-cyan-200 rounded px-2 sm:px-3 py-2 w-24 sm:w-32 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
              required
              value={expenseDate}
              onChange={e => setExpenseDate(e.target.value)}
            />
            {/* Campo de vencimento só para saída */}
            {type === "saida" && (
              <input
                type="date"
                className="border border-red-300 rounded px-2 sm:px-3 py-2 w-24 sm:w-32 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base"
                required
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                placeholder="Vencimento"
                title="Data de vencimento"
              />
            )}
            <div className="flex items-center gap-1 sm:gap-2 w-40 sm:w-56 relative">
              <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="border border-cyan-200 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base">
                <option value="">Tipo de Despesa</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button type="button" title="Adicionar nova categoria" onClick={() => setShowAddCategory(v => !v)} className="bg-cyan-500 hover:bg-cyan-700 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg sm:text-xl font-bold shadow transition">
                +
              </button>
            </div>
            <button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-4 sm:px-6 py-2 rounded-xl shadow-lg flex items-center gap-2 text-base transition w-full sm:w-auto order-last sm:order-none">
              <FaPlus /> {editId ? "Salvar" : "Adicionar"}
            </button>
          </form>
        )}
        {/* Popover de categorias FORA do form principal */}
        {showAddCategory && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
            <div className="bg-white/95 border-2 border-cyan-200 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-3 w-11/12 max-w-xs animate-fade-in relative">
              <div className="font-bold text-cyan-800 text-lg mb-1 flex items-center gap-2">
                Gerenciar categorias
                <button type="button" onClick={() => setShowAddCategory(false)} className="ml-auto text-cyan-500 hover:text-cyan-800 text-xl">×</button>
              </div>
              <form onSubmit={handleAddCategory} className="flex items-center gap-2" autoComplete="off">
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="Nova categoria"
                  className="border border-cyan-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-1 text-sm sm:text-base"
                  maxLength={20}
                  autoFocus
                />
                <button type="submit" className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-700 text-white rounded-lg px-4 sm:px-5 py-2 font-bold shadow transition text-sm sm:text-base">Salvar</button>
              </form>
              <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
                {categories.map(cat => (
                  <span key={cat} className="bg-cyan-100 text-cyan-800 rounded-lg px-3 py-1 flex items-center gap-1 text-xs sm:text-sm shadow-sm">
                    {cat}
                    <button type="button" title="Remover" onClick={() => handleRemoveCategory(cat)} className="text-red-500 hover:text-red-800 ml-1 font-bold text-base">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Botão de adicionar/salvar despesa agora está dentro do <form> */}
        {/* Lista de despesas */}
        {activeTab === "geral" && (
          <div className="bg-white/95 rounded-3xl shadow-2xl p-3 sm:p-8 border-2 border-cyan-100 mt-6 sm:mt-8 overflow-x-auto max-h-[480px]">
            <table className="w-full min-w-[520px] sm:min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="text-cyan-700 text-left">
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Valor</th>
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Data</th>
                  <th className="py-2">Vencimento</th>
                  <th className="py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-8">Nenhuma despesa encontrada.</td>
                  </tr>
                ) : (
                  filteredExpenses.slice(0, 10).map(e => {
                    const isVencida = e.type === "saida" && e.dueDate && new Date(e.dueDate) < new Date();
                    return (
                      <tr key={e.id} className={
                        "border-b last:border-b-0 transition-all duration-200 cursor-pointer group " +
                        (isVencida ? "bg-red-100/60" : "hover:bg-cyan-100/40")
                      }>
                        <td className={"py-2 font-medium " + (isVencida ? "text-red-700" : "text-gray-800 group-hover:text-cyan-700")}>{e.desc}</td>
                        <td className={"py-2 " + (isVencida ? "text-red-700" : "text-gray-700 group-hover:text-cyan-700")}>R$ {e.amount.toFixed(2)}</td>
                        <td className={"py-2 font-semibold " + (e.type === "entrada" ? "text-green-600 group-hover:text-green-800" : isVencida ? "text-red-700" : "text-red-600 group-hover:text-red-800")}>{e.type === "entrada" ? "Entrada" : "Saída"}</td>
                        <td className={"py-2 " + (isVencida ? "text-red-700" : "text-gray-500 group-hover:text-cyan-700")}>{new Date(e.date).toLocaleDateString()}</td>
                        <td className={"py-2 flex items-center gap-2 " + (isVencida ? "text-red-700 font-bold" : "")}>{e.dueDate ? new Date(e.dueDate).toLocaleDateString() : "-"} {isVencida && <span title="Vencida" className="ml-1">⚠️</span>}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2">
                            <button title="Editar" onClick={() => handleEdit(e)} className="text-cyan-600 hover:text-cyan-900 p-1 rounded transition focus:outline-none focus:ring-2 focus:ring-cyan-400"><FaEdit /></button>
                            <button title="Excluir" onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-800 p-1 rounded transition focus:outline-none focus:ring-2 focus:ring-red-400"><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

