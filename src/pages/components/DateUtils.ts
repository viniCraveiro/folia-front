export const getCurrentDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');

  return `${getCurrentYearMonth()}-${day}`;
};

export const getCurrentYearMonth = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed

  return `${year}-${month}`;
};
