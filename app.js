const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extemded: false }));
app.use(methodOverride('\_method')); // For PUT and DELETE methods in form

// Routes
const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

// Redirect root to task
app.get('/', (req, res) => {
    res.redirect('/tasks');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
