const express = require('express');
const router = express.Router();
const Joi = require('joi'); // return a class
const courses = require('../../Courses');
// Route for courses API
router.get('/api/courses', (req, res) => {
  res.send(courses);
});

router.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
  } // 404 response not found
  res.send(course);
});

router.post('/api/courses', (req, res) => {
  const {error} = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
  }
  // 404 response not found
  const {error} = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // 400 bad request
  // update course
  course.name = req.body.name;
  res.send(course);
});

router.delete('/api/courses/:id', (req, res) => {
  // Look up course
  // Does not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
  }
  // 404 response not found
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  // Invalid return 400 bad request
  return Joi.validate(course, schema);
}

module.exports = router;
