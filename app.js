// ---------- Datos ----------
const LEAGUE_NAME = "LALIGA";
const SEASON = "2026-27";

const STAT_COLUMNS = [
  { key: "j", label: "J" },
  { key: "g", label: "G" },
  { key: "e", label: "E" },
  { key: "p", label: "P" },
  { key: "gf", label: "GF" },
  { key: "gc", label: "GC" },
  { key: "dif", label: "DIF" },
  { key: "pts", label: "PTS" },
];

let teams = [
  { name: "Alavés", color: "#004b96" },
  { name: "Athletic Club", color: "#e2231a" },
  { name: "Atlético de Madrid", color: "#c8102e" },
  { name: "Barcelona", color: "#a50044" },
  { name: "Celta Vigo", color: "#8ac9ea" },
  { name: "Deportivo La Coruña", color: "#0064b0" },
  { name: "Elche", color: "#046a38" },
  { name: "Espanyol", color: "#0055a4" },
  { name: "Getafe", color: "#005ba4" },
  { name: "Levante", color: "#0e4194" },
  { name: "Málaga", color: "#2266b3" },
  { name: "Osasuna", color: "#d2001c" },
  { name: "Racing Santander", color: "#00a651" },
  { name: "Rayo Vallecano", color: "#e2231a" },
  { name: "Real Betis", color: "#0bb363" },
  { name: "Real Madrid", color: "#ffffff" },
  { name: "Real Oviedo", color: "#0056a8" },
  { name: "Real Sociedad", color: "#0067b1" },
  { name: "Sevilla", color: "#d2001c" },
  { name: "Valencia", color: "#ee8300" },
].map(t => ({ ...t, j: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, dif: 0, pts: 0 }));

let sortKey = null;
let sortAsc = true;

// ---------- Helpers ----------
function initials(name) {
  return name.replace("Real ", "R.").split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
}

function sortBy(key) {
  if (key === "pos" || key === "team") return;

  if (sortKey === key) {
    sortAsc = !sortAsc;
  } else {
    sortKey = key;
    sortAsc = false;
  }

  teams.sort((a, b) => (sortAsc ? a[key] - b[key] : b[key] - a[key]));
  renderRows();
}

// ---------- Construcción del DOM ----------
function buildTable() {
  const wrapper = document.createElement("div");
  wrapper.className = "main-panel";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = `Posiciones de la ${LEAGUE_NAME} ${SEASON}`;

  const leagueName = document.createElement("h2");
  leagueName.className = "league-name";
  leagueName.textContent = LEAGUE_NAME;

  const table = document.createElement("table");
  table.id = "standings-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const posTh = document.createElement("th");
  posTh.dataset.key = "pos";
  posTh.textContent = SEASON.replace("-", "/20");
  headRow.appendChild(posTh);

  const teamTh = document.createElement("th");
  teamTh.dataset.key = "team";
  headRow.appendChild(teamTh);

  STAT_COLUMNS.forEach(col => {
    const th = document.createElement("th");
    th.dataset.key = col.key;
    th.innerHTML = `<u>${col.label}</u>`;
    th.addEventListener("click", () => sortBy(col.key));
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  const tbody = document.createElement("tbody");
  tbody.id = "standings-body";

  table.appendChild(thead);
  table.appendChild(tbody);

  wrapper.appendChild(title);
  wrapper.appendChild(leagueName);
  wrapper.appendChild(table);

  document.getElementById("root").appendChild(wrapper);
}

function renderRows() {
  const tbody = document.getElementById("standings-body");
  tbody.innerHTML = "";

  teams.forEach((t, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="team-cell">
        <span class="crest" style="background:${t.color};color:${t.color === "#ffffff" ? "#333" : "#fff"};border:${t.color === "#ffffff" ? "1px solid #ccc" : "none"}">${initials(t.name)}</span>
        <a href="#">${t.name}</a>
      </td>
      ${STAT_COLUMNS.map(col => `<td class="${col.key === "pts" ? "pts" : ""}">${t[col.key]}</td>`).join("")}
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll("thead th").forEach(th => th.classList.remove("sorted"));
  if (sortKey) {
    document.querySelector(`th[data-key="${sortKey}"]`)?.classList.add("sorted");
  }
}

// ---------- Init ----------
buildTable();
renderRows();