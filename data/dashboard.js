function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getPercent(amount, total) {
  if (total <= 0) return 0;
  return Math.round((amount / total) * 100);
}

function getDashboardData() {
  const expenseEvolution = [
    { label: '01/06', value: 220 },
    { label: '02/06', value: 1580 },
    { label: '03/06', value: 18 },
    { label: '04/06', value: 0 },
    { label: '05/06', value: 62 },
    { label: '06/06', value: 95 },
    { label: '07/06', value: 78 }
  ];

  const maxChart = Math.max(...expenseEvolution.map(p => p.value), 1);

  const overviewCards = [
    { title: 'Contas', amount: 5125.23, icon: '', colorClass: 'overview-blue', iconPath: '/images/icons/contas.svg' },
    { title: 'Receitas', amount: 5903.73, icon: '', colorClass: 'overview-green', iconPath: '/images/icons/receitas.svg' },
    { title: 'Despesas', amount: 2774.61, icon: '', colorClass: 'overview-red', iconPath: '/images/icons/despesas.svg' },
    { title: 'Balanço transferências', amount: 50.00, icon: '', colorClass: 'overview-yellow', iconPath: '/images/icons/transferencias.svg' }
  ];

  const accounts = [
    { description: 'Bradesco', receitas: 6609.73, despesas: 2273.94, saldo: 4883.19, previsto: 4399.39 },
    { description: 'Nubank', receitas: 0.00, despesas: 2470.93, saldo: 175.44, previsto: -715.62 }
  ];

  const categoryExpenses = [
    { name: 'Pagamentos', amount: 1505.19, color: '#9a9da5' },
    { name: 'Moradia', amount: 1456.64, color: '#ee3d3a' },
    { name: 'Variáveis', amount: 1165.31, color: '#7353be' },
    { name: 'Outros', amount: 388.44, color: '#f15a59' },
    { name: 'Demais', amount: 339.89, color: '#3f63b8' }
  ];

  const categoryTotal = categoryExpenses.reduce((sum, item) => sum + item.amount, 0);
  let donutGradient = '#d7dae1 0 100%';
  if (categoryTotal > 0) {
    const sections = [];
    let start = 0;
    for (const item of categoryExpenses) {
      const percent = (item.amount / categoryTotal) * 100;
      const end = start + percent;
      sections.push(`${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`);
      start = end;
    }
    donutGradient = sections.join(', ');
  }

  return {
    title: 'Minhas Finanças',
    currentMonth: 'Junho',
    initialValue: 2051.12,
    currentBalance: 5120.23,
    forecastValue: 3745.37,
    pendingExpensesCount: 17,
    pendingExpensesTotal: 2080.86,
    expenseEvolution,
    maxChart,
    overviewCards,
    accounts,
    categoryExpenses,
    categoryTotal,
    donutGradient,
    formatCurrency,
    getPercent
  };
}

module.exports = { getDashboardData, formatCurrency, getPercent };
