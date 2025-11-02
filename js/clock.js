const timeText = document.getElementById("clock-text");

const canvas = document.getElementById("clock-canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const timeZoneOffset = getTimeZoneOffset()

function getTimeZoneOffset() {
  const currentDate = new Date()
  const cYear = currentDate.getUTCFullYear()
  console.log(currentDate.toUTCString())

  const endCurrentYear = new Date(Date.UTC(cYear, 2, nthDayOfMonth(2, 0, 2, cYear), 9));
  console.log(endCurrentYear.toUTCString())

  const startCurrentYear = new Date(Date.UTC(cYear, 10, nthDayOfMonth(1, 0, 10, cYear), 10));
  console.log(startCurrentYear.toUTCString())

  const currentMS = currentDate.getTime()
  const endMS = endCurrentYear.getTime()
  const startMS = startCurrentYear.getTime()

  let DST = currentMS > endMS && currentMS <= startMS 

  return DST ? 7 : 8
}

// returns the date of the first given day of the given month and year
function nthDayOfMonth(n, day, month, year) {
  const firstDay = new Date(Date.UTC(year, month)).getUTCDay()

  let date = (n - 1) * 7 + 1
  if (firstDay > day) {
    date += 7 - (firstDay - day);
  } else {
    date += day - firstDay
  }

  return date
}

ctx.strokeStyle = "white";
ctx.lineWidth = 2

function update() {
  const now = new Date()
  now.setUTCHours(now.getUTCHours() - timeZoneOffset)
  
  const h = now.getUTCHours();
  const m = now.getUTCMinutes();
  const tz = timeZoneOffset == 7 ? "PDT (UTC-7)" : "PST (UTC-8)"

  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.beginPath();
  ctx.arc(0, 0, width / 3.5, 0, 2 * Math.PI);
  ctx.moveTo(0, 0);
  const hRad = (h % 12) / 12 * 2 * Math.PI;
  const hHandSize = width / 6
  ctx.lineTo(hHandSize * Math.sin(hRad), -hHandSize * Math.cos(hRad));
  ctx.moveTo(0, 0);
  const mRad = m * 6 * Math.PI/180;
  const mHandSize = width / 3
  ctx.lineTo(mHandSize * 0.7 * Math.sin(mRad), -mHandSize * 0.7 * Math.cos(mRad));
  ctx.stroke();
  ctx.restore();
  
  timeText.innerText = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + " " + tz;
}

update()
setInterval(update, 1000)




