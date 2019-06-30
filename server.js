const express = require('express')
const app = express()
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
//ls 29 
//const expressValidator = require('express-validator')

const morgan = require('morgan')
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

connectDB()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

//app.use(expressValidator());

app.get('/', (req, res) => res.send('Hello World!'))

//Define routes
app.use(morgan('dev'))
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'invalid token...'});
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

