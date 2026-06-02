import type { Category } from "../types"

type FilteredBalanceProps = {
    amount: number;
    selectedCategory: string;
    categories: Category[]
}

function FilteredBalance({amount, selectedCategory, categories}:FilteredBalanceProps) {
    
const categoryObj = categories.find((obj)=>obj.key === selectedCategory)
const categoryName = categoryObj?.name ?? 'Неизвестная категория'

    return (
        <div className="filteredBalance">
            <h3>Баланс по категории</h3>
            <div className="category-name">
                <p>{categoryName}</p>
            </div>
            <p>{amount}р</p>
        </div>
    )
}

export default FilteredBalance