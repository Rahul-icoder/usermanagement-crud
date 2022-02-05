const mongoose = require('mongoose')

const userImageSchema = new mongoose.Schema({
	userId:{
		type:String,
	},
	images:[{
		name:String,
	}]
},{timestamps:true})

const UserImage = mongoose.model('userImages',userImageSchema);

module.exports = UserImage;