import type { Dispatch, SetStateAction, RefObject } from "react"

type TransactionSearchProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

function TransactionSearch({searchTerm, setSearchTerm, searchInputRef}: TransactionSearchProps) {
    return (
        <div className="form-control">
        <label htmlFor="search">Поиск по названию</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          ref={searchInputRef}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Например: кофе"
        />
      </div>
    )
}

export default TransactionSearch