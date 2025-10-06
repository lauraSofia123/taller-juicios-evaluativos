export async function obtenerAprendices(urlFicha) {
  try {
    const respuesta = await fetch(urlFicha);

    if (!respuesta.ok) {
      throw new Error("Error al obtener los aprendices de la ficha seleccionada.");
    }

    const datos = await respuesta.json();

    if (Array.isArray(datos)) {
      const aprendicesMap = {};

      datos.forEach(registro => {
        const documento = registro["Número de Documento"];

        if (!aprendicesMap[documento]) {
          aprendicesMap[documento] = {
            documento,
            nombres: registro.Nombre || "",
            apellidos: registro.Apellidos || "",
            estado: registro.Estado || "",
            competencias: [],
            juicios: []
          };
        }

        const resultado = {
          competencia: registro.Competencia || "—",
          resultado: registro["Resultado de Aprendizaje"] || "—",
          juicio: registro["Juicio de Evaluación"] || "SIN JUICIO",
          fecha: registro["Fecha y Hora del Juicio Evaluativo"]?.split(" ")[0] || "—",
          hora: registro["Fecha y Hora del Juicio Evaluativo"]?.split(" ")[1] || "",
          instructor: registro["Funcionario que registro el juicio evaluativo"] || "—"
        };

        aprendicesMap[documento].juicios.push(resultado);

        let competencia = aprendicesMap[documento].competencias.find(
          c => c.nombre === registro.Competencia
        );

        if (!competencia) {
          competencia = { nombre: registro.Competencia, resultados: [] };
          aprendicesMap[documento].competencias.push(competencia);
        }

        competencia.resultados.push(resultado);
      });

      return Object.values(aprendicesMap);
    }

    console.warn("El formato del archivo JSON no es el esperado:", urlFicha);
    return [];
  } catch (error) {
    console.error("Error al cargar los aprendices:", error);
    return [];
  }
}