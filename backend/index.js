const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors')
require('dotenv').config;
require('./helper/initDb')
const userRoute = require('./src/userRoute');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(
	cors({
		origin: ["http://localhost:3000"],
	})
);

//route start
app.use('/api',userRoute);

//route end

app.use(async (req, res, next) => {
	next(createError.NotFound());
});

app.use((err, req, res, next) => {
	res.status = err.status || 500;
	res.send({
			status: err.status || 500,
			message: err.message,
	});
});



app.listen(PORT,()=>{
	console.log(`server listening on port ${PORT}`)
})