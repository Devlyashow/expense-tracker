import type { Category } from "../types"
import type { Dispatch, SetStateAction } from "react"

type CategoryFilterProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categories: Category[]
}

function CategoryFilter ({selectedCategory, setSelectedCategory, categories}: CategoryFilterProps) {
    
    return (
        <div className="form-control">
        <label htmlFor="categoryFilter">Фильтр по категории</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Все</option>
          {categories.map((obj)=>{
           return <option key={obj.id} value={obj.key}>{obj.name}</option>
          })}
        </select>
      </div>
    )
}

export default CategoryFilter