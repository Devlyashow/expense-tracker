export default function formatDate(date: string): string {
  const [year, month, day] = date.split('-')

  if (!year || !month || !day) {
    return date
  }

  return `${day}.${month}.${year}`
}