const express = require('express')
const app = express()
const connectDB = require('./config/db')
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

connectDB()

app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => res.send('Hello World!'))

//Define routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

