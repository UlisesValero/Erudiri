import Evaluacion from '../models/Evaluacion.js'
import Usuario from '../models/Usuario.js'

// Crear una nueva evaluación (admin o IA)
export const crearEvaluacion = async (req, res) => {
  try {
    const { arista, preguntas, tipo, nivel } = req.body

    const nuevaEval = new Evaluacion({
      arista,
      preguntas,
      tipo,
      nivel,
    })

    await nuevaEval.save()
    res.status(201).json(nuevaEval)
  } catch (error) {
    console.error('Error al crear evaluación:', error)
    res.status(500).json({ message: 'Error al crear la evaluación' });
  }
}

// Obtener evaluación por arista
export const obtenerEvaluacionPorArista = async (req, res) => {
  try {
    const { aristaId } = req.params
    const evaluacion = await Evaluacion.findOne({ arista: aristaId })

    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada' })
    }

    // Evitar enviar respuestas correctas
    const preguntasSinRespuestas = evaluacion.preguntas.map((p) => ({
      tipo: p.tipo,
      enunciado: p.enunciado,
      opciones: p.opciones?.map(o => ({ texto: o.texto })) || [],
    }));

    res.json({
      _id: evaluacion._id,
      tipo: evaluacion.tipo,
      arista: evaluacion.arista,
      nivel: evaluacion.nivel,
      preguntas: preguntasSinRespuestas,
    })
  } catch (error) {
    console.error('Error al obtener evaluación:', error)
    res.status(500).json({ message: 'Error al obtener la evaluación' })
  }
}

// Enviar respuestas del usuario (multiple choice)
export const enviarRespuestas = async (req, res) => {
  try {
    const { aristaId } = req.params
    const { respuestas, usuarioId } = req.body

    const evaluacion = await Evaluacion.findOne({ arista: aristaId })
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada' })
    }

    if (evaluacion.tipo !== 'multiple-choice') {
      return res.status(400).json({ message: 'Este tipo de evaluación no se corrige automáticamente' })
    }

    let correctas = 0

    // Comparar respuestas
    evaluacion.preguntas.forEach((pregunta, index) => {
      const respuestaUsuario = respuestas[index]
      const opcionCorrecta = pregunta.opciones.find((op) => op.correcta)?.texto

      if (respuestaUsuario?.trim().toLowerCase() === opcionCorrecta?.trim().toLowerCase()) {
        correctas++
      }
    });

    const score = (correctas / evaluacion.preguntas.length) * 100
    const aprobado = score >= 70

    // Actualizar progreso si aprobó
    if (aprobado) {
      await Usuario.findOneAndUpdate(
        { nombre: usuarioId },
        { $addToSet: { completado: aristaId } },
        { upsert: true }
      )
    }

    res.json({ score, aprobado })
  } catch (error) {
    console.error('Error al enviar respuestas:', error)
    res.status(500).json({ message: 'Error al enviar respuestas' })
  }
}
