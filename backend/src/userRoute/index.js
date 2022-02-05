const express = require('express');
const User = require('./userModel/userSchema');
const multer = require('multer')
const router = express.Router();
const UserImage = require('./userModel/userImageSchema')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.post('/add/user',upload.array("images", 12),async(req,res,next)=>{
	try{
		const user = new User(req.body);
		const userResult = await user.save();
		let userImageResult = {}
		if(req.files.length){
			const userImage = UserImage({
				userId:userResult._id,
				images:req.files.map(image=>({name:image.filename}))
			});
			userImageResult = await userImage.save();
		}
		res.status(200).send({
			user:userResult,
			userImage:userImageResult
		})
	}catch(err){
		next(err)
	}
})

router.get('/get/user',async(req,res,next)=>{
	try{
		const users = await User.find({isDeleted:false});
		if(!users.length) return res.status(404).send('User Not Found')
		res.status(200).send(users)
	}catch(err){
		console.log(err)
	}
})

router.patch('/edit/user',upload.array("images", 12),(req,res,next)=>{

})

router.delete('/delete/user/:userId',async(req,res,next)=>{
	try{
		const user = await User.findOne({_id:req.params.userId});
		if(!user) return res.status(404).send({status:'failed',msg:'User Not Found'})
		user.isDeleted = true;
		await user.save();
		res.status(200).send({staus:'success',msg:'deleted successfully'})
	}catch(err){
		console.log(err)
	}
})	

module.exports = router;