import type { PeriodPreset } from '../types'
import getLocalDateString from '../utils/getLocalDateString'

type StatisticsFiltersProps = {
  dateFrom: string;
  dateTo: string;
  periodPreset: PeriodPreset;
  error: string;
  title: string;
  setDateFrom: React.Dispatch<React.SetStateAction<string>>;
  setDateTo: React.Dispatch<React.SetStateAction<string>>;
  setPeriodPreset: React.Dispatch<React.SetStateAction<PeriodPreset>>;
};

export default function PeriodFilter({dateFrom, dateTo, periodPreset, error, setDateFrom, setDateTo, setPeriodPreset, title}: StatisticsFiltersProps) {
  return (
    <div>
<div className="statistics-page_date-filter">
    <select
    style={{display:"block", margin:"auto", marginBottom:"10px" }}
    value={periodPreset}
    onChange={e => {
      const value = e.target.value as PeriodPreset
      setPeriodPreset(value)
      const today = new Date()
      if (value === 'all') {
        setDateFrom('')
        setDateTo('')
      }
      if (value === 'day') {
        setDateFrom(getLocalDateString(today))
        setDateTo(getLocalDateString(today))
      }
      if (value === 'week') {
        if (today.getDay() === 1) {
          setDateFrom(getLocalDateString(today))
          setDateTo(getLocalDateString(today))
        } else {
          const lastMonday = new Date(today.getTime() - ((today.getDay() +6) % 7) * 24 * 60 * 60 * 1000)
          setDateFrom(getLocalDateString(lastMonday))
          setDateTo(getLocalDateString(today))
        }
      }
      if (value === 'month') {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const firstDay = '01'; 
        setDateFrom(`${year}-${month}-${firstDay}`);
        setDateTo(getLocalDateString(today))
      }
      if (value === 'lastMonth') {
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        setDateFrom(getLocalDateString(firstDayLastMonth))
        setDateTo(getLocalDateString(lastDayLastMonth))
      }
    }}
    >
      <option
      value="all"
      >Выберите период</option>
      <option
      value="day"
      >Сегодня</option>
      <option
      value="week"
      >Эта неделя</option>
      <option
      value="month"
      >Этот месяц</option>
      <option
      value="lastMonth"
      >Прошлый месяц</option>
      <option
      value="custom"
      >Другой период</option>
    </select>
    {periodPreset === "custom" && (
    <>
      <label htmlFor="from">От:</label>
      <input
      id="from"
      type="date"
      name="from"
      style={{ marginRight: '10px', marginLeft: '5px' }}
      value={dateFrom}
      onChange={(e) => setDateFrom(e.target.value)}
      />
      <label htmlFor="to">До:</label>
      <input
      id="to"
      type="date"
      name="to"
      style={{marginLeft: '5px' }}
      value={dateTo}
      onChange={(e) => setDateTo(e.target.value)}
      />
    </>
)}
    <p className="statistics-page_tittle">{title}</p>
  </div>
  {error && <p className="error">{error}</p>}
    </div>
  )
}
