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
];

function initials(name) {
  return name.replace("Real ", "R.").split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
}

function render() {
  const grid = document.getElementById("teams-grid");
  grid.innerHTML = "";

  teams.forEach(t => {
    const card = document.createElement("div");
    card.className = "team-card";

    card.innerHTML = `
      <span class="crest-lg" style="background:${t.color};color:${t.color === "#ffffff" ? "#333" : "#fff"};border:${t.color === "#ffffff" ? "1px solid #ccc" : "none"}">
        ${initials(t.name)}
      </span>
      <span class="team-name">${t.name}</span>
    `;

    grid.appendChild(card);
  });
}

render();