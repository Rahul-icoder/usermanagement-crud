import {useState,useEffect} from 'react'
import {Box} from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import axios from 'axios'
import './userimages.css'
const UserImages = () => {
	let {userId} = useParams();
	const [userImages,setUserImages] = useState([])
	useEffect(()=>{
		axios.get(`http://localhost:5000/api/get/userimages/${userId}`).then(res=>{
			setUserImages(res.data.images);
		}).catch(err=>console.log(err))
	},[])
	return (
		<container style={{display:"flex",justifyContent:'center'}}>
			<Box w='50%' bg='white' p={5} borderWidth='1px' borderRadius='lg' mt="10">
				<h1 align="center" style={{fontWeight:600}}>USER IMAGES</h1>
				<div className="userimage-container">
					{userImages.map(img=>(
						<img src={`/assets/${img.name}`} alt={img.name}/>
					))}
				</div>
			</Box>
		</container>
	)
}

export default UserImages