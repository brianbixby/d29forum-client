'use strict';

/*********************************DEPENDENCIES***********************************/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/*********************************CONST DECLARATIONS*****************************/
const app = express();
const PORT = process.env.PORT //|| 3000;

/*********************************MIDDLEWARE*************************************/
app.use(express.static('./public'));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/*********************************OTHER SETUP************************************/
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

/************************************ROUTES***************************************/
app.get('/', (req, res) => res.sendFile('index.html', {root: './public'}));
