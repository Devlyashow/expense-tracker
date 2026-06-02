type BalanceProps = {
    amount:number
}

function Balance ({amount}:BalanceProps) {
    return (
        <div>
            <h2>Общий баланс</h2>
            <p>{amount}р</p>
        </div> 
    )
}

export default Balance