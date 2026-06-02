type IncomeExpenseProps = {
    income: number;
    expense: number;
}

function IncomeExpense({income, expense}: IncomeExpenseProps) {
    return (
        <div>
            <h3>Доходы</h3>
            <p>{income}р</p>

            <h3>Расходы</h3>
            <p>{expense}р</p>
        </div>
    )   
}

export default IncomeExpense