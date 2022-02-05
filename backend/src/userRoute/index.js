const express = require('express');
const User = require('./userModel/userSchema');
const multer = require('multer')
const router = express.Router();
const UserImage = require('./userModel/userImageSchema')
const fs = require('fs');
const path = require('path')
//Images store in public directory

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/assets')
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
			const userImage = new UserImage({
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

router.patch('/edit/user/:userId',upload.array("images", 12),async(req,res,next)=>{
	const folderPath = "../public/assets";
	try{
		const result = await User.findByIdAndUpdate(req.params.userId,req.body);
		if(req.files.length){
			const userImage = await UserImage.findOne({userId:req.params.userId})
			for(let i=0;i<userImage.images.length;i++){
	          fs.unlinkSync(path.join("../public/assets", userImage.images[i].name), (err) => {
	            if (err) throw err;
	          });
			}
			const imageResult = await UserImage.findByIdAndUpdate(userImage._id,{
				userId:result._id,
				images:req.files.map(image=>({name:image.filename}))
			})
		}
		res.status(200).send({
			status:'success',
			msg:'updated successfully'
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
		next(err)
	}
})

router.delete('/delete/user/:userId',async(req,res,next)=>{
	try{
		const user = await User.findOne({_id:req.params.userId});
		if(!user) return res.status(404).send({status:'failed',msg:'User Not Found'})
		user.isDeleted = true;
		await user.save();
		res.status(200).send({staus:'success',msg:'deleted successfully'})
	}catch(err){
		next(err)
	}
})	

router.get('/get/userimages/:userId',async(req,res,next)=>{
	try{
		const userimages = await UserImage.findOne({userId:req.params.userId});
		if(!userimages) return res.status(404).send('User Not Found')
		res.status(200).send(userimages)
	}catch(err){
		next(err)
	}
})

module.exports = router;