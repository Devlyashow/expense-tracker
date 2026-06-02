import type { Dispatch, SetStateAction } from "react"
import type { SortOption } from "../constants/sortNames"

type TransactionSortProps = {
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
}

function TransactionSort({sortOption, setSortOption}: TransactionSortProps) {
    return (
        <div className="form-control">
        <label htmlFor="sort">Сортировка</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="newest">Сначала новые</option>
          <option value="amount-desc">По сумме: больше → меньше</option>
          <option value="amount-asc">По сумме: меньше → больше</option>
          <option value="name-az">По названию: А → Я</option>
          <option value="name-za">По названию: Я → А</option>
          <option value="category-az">По категории: А → Я</option>
          <option value="category-za">По категории: Я → А</option>
        </select>
    </div>
    )
}

export default TransactionSort