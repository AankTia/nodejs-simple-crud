const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout'); // Default layout file is layout.ejs

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // For PUT and DELETE methods in forms

// Routes
const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

// Redirect root to tasks
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});