const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName:{
		type:String,
	},
	lastName:{
		type:String,
	},
	email:{
		type:String,
		unique:true
	},
	password:{
		type:String,
	},
	phoneNumber:{
		type:Number,
		unique:true,
	},
	code:{
		type:String,
		unique:true,
		maxLength:6
	},
	isDeleted:{
		type:Boolean,
		default:false
	}
},{timestamps:true})

const User = mongoose.model('user',userSchema);

module.exports = User;