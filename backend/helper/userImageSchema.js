const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	userId:{
		type:String,
	},
	images:[{
		name:String,
	}]
},{timestamps:true})

const User = mongoose.model('user',userSchema);
