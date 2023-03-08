const dateGenerator = (): string => {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const date = `${day}/${month}/${year} - ${hours}:${minutes}`
  return date;
}

export default dateGenerator;