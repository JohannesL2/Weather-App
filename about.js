// TODO: add date + time, see:
function dateTime() {
  let dateText = new Date().toISOString().split("T")[0];
  let timeText = new Date().toLocaleTimeString();
  document.getElementById("time").innerHTML = timeText;
  document.getElementById("date").innerHTML = dateText;
}
setInterval(dateTime, 1000);
