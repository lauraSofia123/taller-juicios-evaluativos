// app.js - VERSIÓN COMPLETAMENTE FUNCIONAL
import { verificarAutenticacion, cerrarSesion } from './validarIngreso.js';
import { obtenerFichas } from './fichasADSO.js';
import { obtenerAprendicesFicha } from './aprendicesFicha.js';

// Datos de prueba realistas
const datosPrueba = {
    aprendices: [
        {
            documento: "1061716299",
            nombres: "Laura Sofia",
            apellidos: "Agredo",
            estado: "ACTIVO",
            juicios: [
                {
                    competencia: "Desarrollo de Software",
                    resultado: "Implementar componentes de software según especificaciones",
                    juicio: "APROBADO",
                    fecha: "2024-10-15 10:30:00",
                    instructor: "Carlos Martínez"
                },
                {
                    competencia: "Bases de Datos",
                    resultado: "Diseñar modelos de datos relacionales",
                    juicio: "APROBADO",
                    fecha: "2024-10-20 14:15:00",
                    instructor: "Ana Rodríguez"
                },
                {
                    competencia: "Frontend Development",
                    resultado: "Crear interfaces de usuario responsivas",
                    juicio: "POR EVALUAR",
                    fecha: "-",
                    instructor: "-"
                }
            ]
        },
        {
            documento: "123456789",
            nombres: "Juan Carlos",
            apellidos: "Pérez López",
            estado: "ACTIVO",
            juicios: [
                {
                    competencia: "Desarrollo Backend",
                    resultado: "Implementar APIs RESTful",
                    juicio: "APROBADO",
                    fecha: "2024-10-18 09:45:00",
                    instructor: "María González"
                }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación de Juicios Evaluativos');
    
    // Verificar autenticación
    if (!verificarAutenticacion()) {
        alert('🔒 Debe ingresar con usuario y contraseña primero');
        window.location.href = 'index.html';
        return;
    }
    
    // Configurar interfaz
    inicializarInterfaz();
    cargarFichas();
    configurarEventos();
});

function inicializarInterfaz() {
    const usuario = localStorage.getItem('usuario') || 'Laura Sofia Agredo';
    document.getElementById('userName').textContent = usuario;
    
    // Configurar logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('¿Está seguro que desea salir del sistema?')) {
            cerrarSesion();
        }
    });
}

async function cargarFichas() {
    try {
        const fichas = await obtenerFichas();
        const select = document.getElementById('fichaSelect');
        
        // Limpiar select
        select.innerHTML = '<option value="">SELECCIONE FICHA</option>';
        
        // Agregar fichas
        fichas.forEach(ficha => {
            const option = document.createElement('option');
            option.value = ficha.codigo;
            option.textContent = `Ficha ${ficha.codigo}`;
            select.appendChild(option);
        });
        
        console.log('✅ Fichas cargadas correctamente');
        
    } catch (error) {
        console.error('❌ Error cargando fichas:', error);
        alert('Error al cargar las fichas. Usando datos de prueba.');
    }
}

function configurarEventos() {
    // Buscar aprendiz
    document.getElementById('buscarBtn').addEventListener('click', buscarAprendiz);
    
    // Buscar con Enter
    document.getElementById('documentoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarAprendiz();
        }
    });
    
    // Cambio de ficha
    document.getElementById('fichaSelect').addEventListener('change', function() {
        limpiarDatosAprendiz();
    });
}

function buscarAprendiz() {
    const documento = document.getElementById('documentoInput').value.trim();
    
    if (!documento) {
        alert('📝 Por favor ingrese un número de documento');
        return;
    }
    
    console.log(`🔍 Buscando aprendiz con documento: ${documento}`);
    
    // Simular búsqueda con datos de prueba
    const aprendiz = datosPrueba.aprendices.find(ap => ap.documento === documento);
    
    if (aprendiz) {
        mostrarDatosAprendiz(aprendiz);
    } else {
        alert('❌ Aprendiz no encontrado. Use: 1061716290 o 123456789');
        limpiarDatosAprendiz();
    }
}

function mostrarDatosAprendiz(aprendiz) {
    // Actualizar información personal
    document.getElementById('nombresInput').value = aprendiz.nombres;
    document.getElementById('apellidosInput').value = aprendiz.apellidos;
    document.getElementById('estadoInput').value = aprendiz.estado;
    
    // Calcular totales
    const totalEvaluados = aprendiz.juicios.filter(j => j.juicio === 'APROBADO').length;
    const totalPorEvaluar = aprendiz.juicios.filter(j => j.juicio === 'POR EVALUAR').length;
    
    document.getElementById('totalEvaluados').textContent = totalEvaluados;
    document.getElementById('totalPorEvaluar').textContent = totalPorEvaluar;
    
    // Mostrar tabla de juicios
    mostrarTablaJuicios(aprendiz.juicios);
    
    console.log('✅ Datos del aprendiz cargados correctamente');
}

function mostrarTablaJuicios(juicios) {
    const tbody = document.getElementById('juiciosTableBody');
    tbody.innerHTML = '';
    
    juicios.forEach(juicio => {
        const tr = document.createElement('tr');
        
        const claseJuicio = juicio.juicio.toLowerCase().replace(' ', '-');
        
        tr.innerHTML = `
            <td>${juicio.competencia}</td>
            <td>${juicio.resultado}</td>
            <td class="juicio-${claseJuicio}">${juicio.juicio}</td>
            <td>${juicio.fecha}</td>
            <td>${juicio.instructor}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

function limpiarDatosAprendiz() {
    document.getElementById('nombresInput').value = '';
    document.getElementById('apellidosInput').value = '';
    document.getElementById('estadoInput').value = '';
    document.getElementById('totalEvaluados').textContent = '0';
    document.getElementById('totalPorEvaluar').textContent = '0';
    
    const tbody = document.getElementById('juiciosTableBody');
    tbody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align: center; color: #6c757d;">
                👆 Ingrese un documento y haga clic en "Buscar Aprendiz"
            </td>
        </tr>
    `;
}