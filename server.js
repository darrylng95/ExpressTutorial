const express = require('express');
const app = express();
const logger = require('./Middleware/logger');
/* const Joi = require('joi'); // return a claass
const courses = require('./Courses'); */

app.use(express.json()); // a middleware

app.use(logger);

app.use(require('./routes/api/courses'))

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
});
// query parameter things after the ? e.g. http://localhost:8000/api/posts/query?sortBy=name
app.get('/api/posts/query', (req, res) => {
  res.send(req.query);
});

/* app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
  } // 404 response not found
  res.send(course);
});

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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
} */

// PORT env
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
