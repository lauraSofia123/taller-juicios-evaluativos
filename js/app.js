import { obtenerFichas } from "./fichasADSO.js";
import { obtenerAprendices } from "./aprendicesFicha.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    alert("Debe iniciar sesión antes de acceder.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("nombreUsuario").textContent = usuario;

  const selectFicha = document.getElementById("selectFicha");
  const selectAprendiz = document.getElementById("selectAprendiz");
  const tabla = document.getElementById("tablaJuicios").querySelector("tbody");

  const fichas = await obtenerFichas();

  fichas.forEach(ficha => {
    const option = document.createElement("option");
    option.value = ficha.url;
    option.textContent = ficha.codigo;
    selectFicha.appendChild(option);
  });

  selectFicha.addEventListener("change", async () => {
    selectAprendiz.innerHTML = "";
    const aprendices = await obtenerAprendices(selectFicha.value);
    aprendices.forEach(ap => {
      const option = document.createElement("option");
      option.value = JSON.stringify(ap);
      option.textContent = `${ap.nombres} ${ap.apellidos} (${ap.documento})`;
      selectAprendiz.appendChild(option);
    });
  });

  selectAprendiz.addEventListener("change", () => {
    const aprendiz = JSON.parse(selectAprendiz.value);
    document.getElementById("nombreAprendiz").textContent = `${aprendiz.nombres} ${aprendiz.apellidos}`;
    document.getElementById("estadoAprendiz").textContent = aprendiz.estado;

    const aprobados = aprendiz.juicios.filter(j => j.juicio === "APROBADO").length;
    const porEvaluar = aprendiz.juicios.filter(j => j.juicio === "POR EVALUAR").length;

    document.getElementById("aprobados").textContent = aprobados;
    document.getElementById("porEvaluar").textContent = porEvaluar;

    tabla.innerHTML = "";
    aprendiz.juicios.forEach(j => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${j.competencia || "—"}</td>
        <td>${j.resultado || "—"}</td>
        <td style="font-weight:600; color:${j.juicio === "APROBADO" ? "#009639" : j.juicio === "POR EVALUAR" ? "#c40000" : "#333"}">
          ${j.juicio}
        </td>
        <td>${j.fecha && j.hora ? `${j.fecha} ${j.hora}` : "—"}</td>
        <td>${j.instructor || "—"}</td>
      `;
      tabla.appendChild(fila);
    });
  });

  document.getElementById("btnSalir").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
});