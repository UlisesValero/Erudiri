import Nivel from '../models/Nivel.js';
import Arista from '../models/Arista.js';
import Leccion from '../models/Leccion.js';
import Evaluacion from '../models/Evaluacion.js';

export const generarContenidoIA = async (req, res) => {
  try {
    const { empresaId, textoBase } = req.body;

    // Simulamos 3 niveles
    const nivelesData = ['Introductorio', 'Intermedio', 'Avanzado'];
    const aristasData = ['Historia de la empresa', 'Producto', 'Procesos internos'];

    const nivelesCreados = [];

    for (const nombreNivel of nivelesData) {
      const nivel = new Nivel({ empresa: empresaId, nombre: nombreNivel });
      await nivel.save();

      for (const nombreArista of aristasData) {
        const arista = new Arista({
          nivel: nivel._id,
          nombre: nombreArista,
          descripcion: `Contenido generado sobre: ${nombreArista}`,
        });
        await arista.save();

        // Simulación lección
        const leccion = new Leccion({
          arista: arista._id,
          titulo: `Lección de ${nombreArista}`,
          contenidoTexto: `${textoBase} (simulación de contenido para ${nombreArista})`,
        });
        await leccion.save();

        // Simulación evaluación multiple choice
        const evaluacion = new Evaluacion({
          nivel: nivel._id,
          arista: arista._id,
          tipo: 'multiple-choice',
          preguntas: [
            {
              tipo: 'multiple-choice',
              enunciado: `¿Qué aprendiste sobre ${nombreArista}?`,
              opciones: [
                { texto: 'Opción A', correcta: false },
                { texto: 'Opción B', correcta: true },
                { texto: 'Opción C', correcta: false },
              ],
            },
          ],
        });
        await evaluacion.save();
      }

      nivelesCreados.push(nivel);
    }

    res.status(200).json({
      message: 'Contenido simulado generado con éxito.',
      niveles: nivelesCreados,
    });
  } catch (error) {
    console.error('Error al simular IA:', error);
    res.status(500).json({ message: 'Error al generar contenido con IA' });
  }
};
