import {userModel} from '../models/Usuario.js'
import Arista from '../models/Artista.js'
import Nivel from '../models/Nivel.js'

export const getUserProgress = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await userModel.findById(userId).populate('progress.aristaId progress.levelId')
    res.status(200).json(user.progress)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener progreso', error })
  }
}

export const updateUserProgress = async (req, res) => {
  const { userId, levelId, aristaId, score } = req.body

  try {
    const user = await userModel.findById(userId);

    // Si ya existe progreso sobre esa arista, actualizar
    const index = user.progress.findIndex(p =>
      p.levelId.toString() === levelId && p.aristaId.toString() === aristaId
    )

    if (index >= 0) {
      user.progress[index].completed = score >= 70 // condición de aprobación
      user.progress[index].score = score
    } else {
      user.progress.push({
        levelId,
        aristaId,
        completed: score >= 70,
        score
      })
    }

    await user.save();
    res.status(200).json({ message: 'Progreso actualizado con éxito' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar progreso', error })
  }
}

export const canAccessArista = async (req, res) => {
  const { userId, aristaId } = req.params

  try {
    const user = await userModel.findById(userId)
    const arista = await Arista.findById(aristaId).populate('level')

    if (!user || !arista) {
      return res.status(404).json({ access: false, message: 'Datos no encontrados' })
    }

    const currentLevelOrder = arista.level.order

    // Comprobar si el usuario completó todos los aristas del nivel anterior
    const allPreviousCompleted = await Arista.find({ level: { $in: await Nivel.find({ order: currentLevelOrder - 1 }) } })
      .then(aristasPrev => {
        const completedAristas = user.progress.filter(p =>
          p.completed && aristasPrev.some(a => a._id.toString() === p.aristaId.toString())
        )
        return completedAristas.length === aristasPrev.length;
      })

    if (currentLevelOrder === 1 || allPreviousCompleted) {
      return res.status(200).json({ access: true })
    }

    res.status(403).json({ access: false, message: 'Debes completar el nivel anterior' })
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar acceso', error })
  }
}
