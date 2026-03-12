let state = {
  receitasPorCategoria: [],
  receitasEvolution: [],
  receitasPorConta: [],
  receitasIndividuais: [],
  totalReceitas: 0,
  receitasPendentes: 0,
  mediaMensal: 0,
  pendingReceitasCount: 0,
  pendingReceitasTotal: 0,
  nextId: 4
};

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getPercent(amount, total) {
  return total > 0 ? Math.round((amount / total) * 1000) / 10 : 0;
}

function initData() {
  if (state.receitasPorCategoria.length === 0) {
    state.receitasPorCategoria = [
      { nome: 'Salário', valor: 8500.00, icon: '💼', color: '#10b981' },
      { nome: 'Freelance', valor: 2200.50, icon: '💻', color: '#f59e0b' },
      { nome: 'Investimentos', valor: 1200.00, icon: '📈', color: '#3b82f6' },
      { nome: 'Outros', valor: 600.00, icon: '💰', color: '#8b5cf6' }
    ];
    state.receitasEvolution = [
      { label: 'Seg', value: 1200 },
      { label: 'Ter', value: 1800 },
      { label: 'Qua', value: 950 },
      { label: 'Qui', value: 2100 },
      { label: 'Sex', value: 1600 },
      { label: 'Sáb', value: 2800 },
      { label: 'Dom', value: 2050 }
    ];
    state.receitasPorConta = [
      { nome: 'Conta Corrente', receitas: 9200.00, pendentes: 1800.00, previsto: 11000.00 },
      { nome: 'Poupança', receitas: 1200.00, pendentes: 300.00, previsto: 1500.00 },
      { nome: 'Investimentos', receitas: 2100.50, pendentes: 200.75, previsto: 2301.25 }
    ];
    state.receitasIndividuais = [
      { id: 1, nome: 'Salário Janeiro', valor: 5000.00, categoria: 'Salário', data: new Date() },
      { id: 2, nome: 'Freelance Projeto X', valor: 1500.00, categoria: 'Freelance', data: new Date() },
      { id: 3, nome: 'Dividendos', valor: 300.00, categoria: 'Investimentos', data: new Date() }
    ];
    state.totalReceitas = 12500.50;
    state.receitasPendentes = 2300.75;
    state.mediaMensal = 10416.92;
    state.pendingReceitasCount = 5;
    state.pendingReceitasTotal = 2300.75;
    state.nextId = 4;
  }
}

function getReceitasData() {
  initData();
  return {
    title: 'Receitas - Minhas Finanças',
    currentMonth: 'Março 2026',
    totalReceitas: state.totalReceitas,
    receitasPendentes: state.receitasPendentes,
    mediaMensal: state.mediaMensal,
    pendingReceitasCount: state.pendingReceitasCount,
    pendingReceitasTotal: state.pendingReceitasTotal,
    receitasEvolution: state.receitasEvolution,
    receitasPorCategoria: state.receitasPorCategoria,
    receitasPorConta: state.receitasPorConta,
    receitasIndividuais: state.receitasIndividuais,
    formatCurrency,
    getPercent
  };
}

function postAdicionarReceita(body) {
  initData();
  const categoriaNome = body.categoriaNome;
  const valor = parseFloat(body.valor);
  if (categoriaNome && valor > 0) {
    const cat = state.receitasPorCategoria.find(c => c.nome === categoriaNome);
    if (cat) {
      cat.valor += valor;
      state.totalReceitas += valor;
    }
  }
}

function postAdicionarCategoria(body) {
  initData();
  const nome = body.categoriaNome;
  const valor = parseFloat(body.categoriaValor);
  const icon = body.categoriaIcon || '💰';
  const color = body.categoriaColor || '#6366f1';
  if (nome && !isNaN(valor)) {
    state.receitasPorCategoria.push({ nome, valor, icon, color });
    state.totalReceitas += valor;
  }
}

function postDeletarCategoria(body) {
  initData();
  const nome = body.categoriaNome;
  const cat = state.receitasPorCategoria.find(c => c.nome === nome);
  if (cat) {
    state.totalReceitas -= cat.valor;
    state.receitasPorCategoria = state.receitasPorCategoria.filter(c => c.nome !== nome);
  }
}

function postAdicionarReceitaIndividual(body) {
  initData();
  const nome = body.nome;
  const valor = parseFloat(body.valor);
  const categoria = body.categoria;
  if (nome && !isNaN(valor) && categoria) {
    const receita = { id: state.nextId++, nome, valor, categoria, data: new Date() };
    state.receitasIndividuais.push(receita);
    const cat = state.receitasPorCategoria.find(c => c.nome === categoria);
    if (cat) cat.valor += valor;
    state.totalReceitas += valor;
  }
}

function postExcluirReceitaIndividual(id) {
  initData();
  const receita = state.receitasIndividuais.find(r => r.id === id);
  if (receita) {
    state.receitasIndividuais = state.receitasIndividuais.filter(r => r.id !== id);
    const cat = state.receitasPorCategoria.find(c => c.nome === receita.categoria);
    if (cat) cat.valor -= receita.valor;
    state.totalReceitas -= receita.valor;
  }
}

module.exports = {
  getReceitasData,
  postAdicionarReceita,
  postAdicionarCategoria,
  postDeletarCategoria,
  postAdicionarReceitaIndividual,
  postExcluirReceitaIndividual
};
