// ================================
// Patient Risk Analysis Logic
// ================================
// Hide dashboards initially
// ================================
// LOGIN LOGIC (ROLE BASED)
// ================================
function login() {
  const role = document.getElementById("role").value;

  if (!role) {
    alert("Please select a role");
    return;
  }

  // Hide login screen, show app
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  // Role-based dashboards
  if (role === "patient") {
    document.getElementById("patientDashboard").style.display = "block";
    document.getElementById("doctorDashboard").style.display = "none";
  } 
  else if (role === "doctor") {
    document.getElementById("patientDashboard").style.display = "none";
    document.getElementById("doctorDashboard").style.display = "block";
    loadPatients();
  }
}


// ================================
// PATIENT RISK ANALYSIS
// ================================
function analyzeRisk() {
  const glucose = Number(document.getElementById("glucoseInput").value);
  const sys = Number(document.getElementById("sysInput").value);
  const dia = Number(document.getElementById("diaInput").value);

  document.getElementById("glucoseValue").innerText = glucose + " mg/dL";
  document.getElementById("bpValue").innerText = sys + " / " + dia + " mmHg";

  let risk = "Low";
  let riskClass = "risk-low";
  let tips = [];

  if (glucose > 180 || sys > 140 || dia > 90) {
    risk = "High";
    riskClass = "risk-high";
    tips = [
      "Consult a doctor immediately",
      "Take prescribed medication",
      "Avoid sugary and salty food"
    ];
  } 
  else if (glucose > 140 || sys > 130 || dia > 85) {
    risk = "Moderate";
    riskClass = "risk-moderate";
    tips = [
      "Monitor your levels daily",
      "Maintain a balanced diet",
      "Do light physical activity"
    ];
  } 
  else {
    tips = [
      "Continue healthy lifestyle",
      "Stay hydrated",
      "Regular monitoring advised"
    ];
  }

  const riskStatus = document.getElementById("riskStatus");
  riskStatus.innerText = risk;
  riskStatus.className = riskClass;

  const list = document.getElementById("recommendations");
  list.innerHTML = "";
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.innerText = tip;
    list.appendChild(li);
  });

  document.getElementById("recommendationSection").classList.remove("hidden");
}


// ================================
// DOCTOR / HOSPITAL DASHBOARD
// ================================
const patients = [
  { name: "Patient A", condition: "Diabetes", risk: "Low" },
  { name: "Patient B", condition: "Hypertension", risk: "High" },
  { name: "Patient C", condition: "Diabetes + BP", risk: "Moderate" }
];

function loadPatients() {
  const table = document.getElementById("patientTable");
  table.innerHTML = "";

  patients.forEach(p => {
    let riskClass = "risk-low";
    if (p.risk === "High") riskClass = "risk-high";
    else if (p.risk === "Moderate") riskClass = "risk-moderate";

    const row = `
      <tr>
        <td>${p.name}</td>
        <td>${p.condition}</td>
        <td class="${riskClass}">${p.risk}</td>
      </tr>
    `;

    table.innerHTML += row;
  });
}
function toggleSidebar() {
  const app = document.getElementById("mainApp");
  app.classList.toggle("sidebar-open");
}
