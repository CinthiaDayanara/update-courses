const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Ruta para actualizar un curso por ID
router.put('/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, duration } = req.body;

    // Verificar si el curso existe por su ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Actualizar el curso con los nuevos datos
    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;

    // Guardar los cambios en la base de datos
    const updatedCourse = await course.save();

    res.json({ message: 'Curso actualizado exitosamente', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso', details: error.message });
  }
});

module.exports = router;
