for (const timeElement of document.querySelectorAll("td[time]")) {
  const timestamp = parseInt(timeElement.getAttribute("time"));
  timeElement.innerText = new Date(timestamp).toLocaleString();
}
