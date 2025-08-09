const tableBody = document.querySelector("#moversTable tbody");
const statusEl = document.getElementById("status");
const lastUpdateEl = document.getElementById("lastUpdate");

const fallbackData = [
  { rank: 1, name: "DemoCoin", symbol: "DCOIN", price: 0.01, change1h: 5 },
  { rank: 2, name: "MoonToken", symbol: "MOON", price: 0.5, change1h: 12 },
];

async function fetchData() {
  try {
    const res = await fetch("https://api.dexscreener.com/latest/dex/tokens");
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    if (!data.pairs) throw new Error("No pairs field");
    renderTable(data.pairs.slice(0, 30));
    statusEl.textContent = "Live Data";
  } catch (e) {
    renderTable(fallbackData);
    statusEl.textContent = "Fallback Data";
  }
  lastUpdateEl.textContent = new Date().toLocaleTimeString();
}

function renderTable(rows) {
  tableBody.innerHTML = "";
  rows.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i + 1}</td><td>${row.name || row.baseToken?.name}</td>
                    <td>${row.symbol || row.baseToken?.symbol}</td>
                    <td>${row.price || row.priceUsd || "-"}</td>
                    <td>${row.change1h || row.priceChange?.h1 || "-"}</td>`;
    tableBody.appendChild(tr);
  });
}

fetchData();
setInterval(fetchData, 30000);
