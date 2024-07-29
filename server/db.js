const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());