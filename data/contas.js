function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getContasData() {
  const contas = [
    { nome: 'Conta Corrente', tipo: 'Corrente', saldo: 5200.75, status: 'Ativa' },
    { nome: 'Poupança', tipo: 'Poupança', saldo: 2550.00, status: 'Ativa' },
    { nome: 'Investimentos', tipo: 'Investimento', saldo: 999.50, status: 'Ativa' },
    { nome: 'Cartão de Crédito', tipo: 'Crédito', saldo: -999.50, status: 'Ativa' }
  ];

  return {
    title: 'Contas - Minhas Finanças',
    currentMonth: 'Março 2026',
    totalSaldo: 8750.25,
    totalReceitas: 12500.50,
    totalDespesas: 3750.25,
    contas,
    formatCurrency
  };
}

module.exports = { getContasData };
