type BalanceDisplayProps = {
  balance: number;
  income: number;
  expense: number
}

export default function BalanceDisplay({ balance, income, expense }:BalanceDisplayProps) {
  const isPositive = balance > 0
  const isNegative = balance < 0
  const isZero = balance === 0

  return (
    <div className="balance-container">
      <div className={`balance-total ${isPositive ? 'balance-positive' : ''} ${isNegative ? 'balance-negative' : ''} ${isZero ? 'balance-zero' : ''}`}>
        <h3>Общий баланс</h3>
        <p className="balance-value">{isZero ? 0 : `${isPositive ? '+' : ''}${balance}`}</p>
      </div>
      <div className="balance-income-expense">
        <div className="balance-income">
          <h4>Доходы</h4>
          <p className="balance-amount">{income}</p>
        </div>
        <div className="balance-expense">
          <h4>Расходы</h4>
          <p className="balance-amount">{expense}</p>
        </div>
      </div>
    </div>
  )
}
