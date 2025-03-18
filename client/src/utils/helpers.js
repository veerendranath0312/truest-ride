function validateEducationalEmail(email) {
  const educationalEmailPattern =
    /^[a-zA-Z0-9_.+-]+@(?:\w+\.)+(edu|ac\.[a-z]{2,}|sch\.[a-z]{2,}|uni\.[a-z]{2,})$/;

  return educationalEmailPattern.test(email);
}

// Format the date as "28 Feb, 2025" if it's valid
function formattedRideDate(rideDate) {
  // Safely parse the ride date
  rideDate = rideDate ? new Date(rideDate) : null;

  return rideDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(rideDate)
    : "Invalid date";
}

// Capitalize the first letter of each word in a string
const capitalize = (str) => {
  if (!str) return ""; // Handle empty or undefined strings
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { validateEducationalEmail, formattedRideDate, capitalize };
