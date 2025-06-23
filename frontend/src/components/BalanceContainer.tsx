import React from 'react';

type Transaccion = {
  _id?: string;
  user_id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: string;
  date: string;
};

type Props = {
  transacciones: Transaccion[];
};

const BalanceContainer = ({ transacciones }: Props) => {
  const ingresos = transacciones
    .filter(t => t.type === 'ingreso')
    .reduce((acc, t) => acc + t.amount, 0);

  const gastos = transacciones
    .filter(t => t.type === 'gasto')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoTotal = ingresos - gastos;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p><strong>Total ingresos:</strong> ${ingresos}</p>
      <p><strong>Total gastos:</strong> ${gastos}</p>
      <p><strong>Saldo total:</strong> ${saldoTotal}</p>
    </div>
  );
};

export default BalanceContainer;
