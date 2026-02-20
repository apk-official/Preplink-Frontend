export function formatDate(
  dateString: string,
  format: "DD-MM-YYYY" | "DD/MM/YYYY" | "DD MMM YYYY" = "DD MMM YYYY"
): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  switch (format) {
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "DD MMM YYYY":
      return `${day} ${monthNames[date.getMonth()]} ${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
}