const teams = [
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

function initials(name) {
  return name.replace("Real ", "R.").split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
}

let sortKey = null;
let sortAsc = true;

function render() {
  const body = document.getElementById("standings-body");
  body.innerHTML = "";
  teams.forEach((t, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="team-cell">
        <span class="crest" style="background:${t.color};color:${t.color === '#ffffff' ? '#333' : '#fff'};border:${t.color === '#ffffff' ? '1px solid #ccc' : 'none'}">${initials(t.name)}</span>
        <a href="#">${t.name}</a>
      </td>
      <td>${t.j}</td><td>${t.g}</td><td>${t.e}</td><td>${t.p}</td>
      <td>${t.gf}</td><td>${t.gc}</td><td>${t.dif}</td>
      <td class="pts">${t.pts}</td>
    `;
    body.appendChild(tr);
  });
}

document.querySelectorAll("#standings-table thead th").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (key === "pos" || key === "team") return;
    if (sortKey === key) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = false;
    }
    teams.sort((a, b) => sortAsc ? a[key] - b[key] : b[key] - a[key]);
    document.querySelectorAll("thead th").forEach(h => h.classList.remove("sorted"));
    th.classList.add("sorted");
    render();
  });
});

render();