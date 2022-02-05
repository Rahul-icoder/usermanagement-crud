import {useState} from 'react'
import { Box,Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './createuser.css'
const CreateUser = () => {
	const [user,setUser] = useState({});
	const [images,setImages] = useState(null)
	const [isLoading,setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) =>{
		setUser(prev=>({...prev,[e.target.name]:e.target.value}))
	}
	const onSubmit = async(e) => {
		e.preventDefault();
		setIsLoading(true)
		let formData = new FormData();
	    for (let key in user) {
	      formData.append(key, user[key]);
	    }
	    if (images) {
	      for (const key of Object.keys(images)) {
	        formData.append("images", images[key]);
	      }
    	}
    	const res = await axios
	      .post("http://localhost:5000/api/add/user", formData)
	      .catch((err) => {
	        console.log(err);
	        setIsLoading(false);
	      });
    	setIsLoading(false)
    	if(res.data){
    		navigate('/')
    	}
	}
	return (
		<container style={{display:"flex",justifyContent:'center'}}>
			<Box w='50%' p={10} borderWidth='1px' borderRadius='lg' mt="10">
				<h1 align="center" style={{fontWeight:600}}>ADD USER</h1>
				<form className="form-container" style={{marginTop:'1.5rem'}} onSubmit={onSubmit}  encType="multipart/form-data">
				  <Input type="text" placeholder='First Name' name="firstName" size='md' onChange={handleChange}  />
				  <Input type="text" placeholder='Last Name' size='md' name="lastName" onChange={handleChange} />
				  <Input type="email" placeholder='Email' size='md' name="email" onChange={handleChange} />
				  <Input type="password" placeholder='Password' size='md' name="password" onChange={handleChange} />
				  <Input type="number" placeholder='Phone No.' size='md' name="phoneNumber" onChange={handleChange} maxLength="10"/>
				  <Input type="text" placeholder='Code' size='md' name="code" onChange={handleChange} maxLength="6"/>
				  <Input type="file" name="images[]" placeholder='Image' size='md' multiple onChange={(e)=>setImages(e.target.files)}/>
				  <Button
				   isLoading={isLoading}
				   loadingText='Loading' 
				   type="submit" 
				   colorScheme='blue'
				   spinnerPlacement='start'
				   >
				   	Submit
				   </Button>
				 </form>
			</Box>
		</container>
	)
}

export default CreateUser