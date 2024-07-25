import { format, formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle undefined or null dateString
  const date = parseISO(dateString);
  const now = new Date();

  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    now.getMonth() -
    date.getMonth();
  if (diffInMonths >= 1) {
    return format(date, "dd MMMM yyyy");
  }
  return formatDistanceToNow(date, { addSuffix: true });
};

export default formatDate;
