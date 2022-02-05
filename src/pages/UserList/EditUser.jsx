import {useState} from 'react'
import { Box,Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from "axios"
const EditUser = ({userId,modalData,setIsModal}) => {
	const [images,setImages] = useState();
	const [isLoading,setIsLoading] = useState(false)
	const [user,setUser] = useState(modalData)
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
	      .patch(`http://localhost:5000/api/edit/user/${userId}`, formData)
	      .catch((err) => {
	        console.log(err);
	        setIsLoading(false);
	      });
    	setIsLoading(false)
    	if(res.data){
    		setIsModal(false)
    	}
	}
	return (
		<container style={{display:"flex",justifyContent:'center'}}>
			<Box w='90%' bg='white' p={10} borderWidth='1px' borderRadius='lg'>
				<form className="form-container" style={{marginTop:'0.5rem'}} onSubmit={onSubmit}  encType="multipart/form-data">
				  <Input type="text" placeholder='First Name' name="firstName" defaultValue={user.firstName} size='md' onChange={handleChange}  />
				  <Input type="text" placeholder='Last Name' size='md' name="lastName" defaultValue={user.lastName} onChange={handleChange} />
				  <Input type="email" placeholder='Email' size='md' name="email" defaultValue={user.email} onChange={handleChange} />
				  <Input type="password" placeholder='Password' size='md' name="password" defaultValue={user.password} onChange={handleChange} />
				  <Input type="number" placeholder='Phone No.' size='md' name="phoneNumber" defaultValue={user.phoneNumber} onChange={handleChange} maxLength="10"/>
				  <Input type="text" placeholder='Code' size='md' name="code" onChange={handleChange} defaultValue={user.code} maxLength="6"/>
				  <Input type="file" name="images[]" placeholder='Image' size='md' multiple onChange={(e)=>setImages(e.target.files)}/>
				  <Button
				   isLoading={isLoading}
				   loadingText='Loading' 
				   type="submit" 
				   colorScheme='blue'
				   spinnerPlacement='start'
				   >
				   	UPDATE
				   </Button>
				 </form>
			</Box>
		</container>
	)
}

export default EditUser