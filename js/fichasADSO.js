// fichasADSO.js
const URL_FICHAS = "https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/JUICIOS_ADSO.js";

export async function obtenerFichas() {
    // Datos de prueba garantizados
    return [
        {
            "codigo": 2874957,
            "url": "https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/ADSO_JUICIOS_2874957.json"
        },
        {
            "codigo": 2923603,
            "url": "https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/ADSO_JUICIOS_2923603.json"
        },
        {
            "codigo": 3064975,
            "url": "https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/ADSO_JUICIOS_3064975.json"
        }
    ];
}