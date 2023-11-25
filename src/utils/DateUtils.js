function formatDate(dateString) {
  const dateObj = new Date(dateString);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  };

  const formattedDateTime = dateObj.toLocaleDateString('tr-TR', options);

  return formattedDateTime;
}

export default formatDate;
