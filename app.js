const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let notes = [];
let idCounter = 1;

app.get('/', (req, res) => {
  res.render('index', { notes });
});

app.post('/add', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    notes.push({ id: idCounter++, title, content });
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', notes: notes.length });
});

app.listen(3000, () => console.log('QuickNotes running on port 3000'));
