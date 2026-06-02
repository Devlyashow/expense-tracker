// as const дает понять, что строки должны быть не какие-нибудь, а именно эти
const sortNames = ['newest', 'amount-desc', 'amount-asc', 'name-az', 'name-za', 'category-az', 'category-za'] as const

export default sortNames

export type SortOption = typeof sortNames[number];