export const incomeCategories = ["Salary", "Freelance", "Gift", "Other"]

export const expenseCategories = [
  "Food",
  "Transport",
  "Rent",
  "Bills",
  "Shopping",
  "Entertainment",
  "Health",
  "Other",
]

// All categories in one list, with duplicates removed ("Other" appears in both)
export const allCategories = [...new Set([...incomeCategories, ...expenseCategories])]