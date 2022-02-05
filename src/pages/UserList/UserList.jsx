import {useState,useEffect} from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import { Box,IconButton,Button,Flex,Spacer } from '@chakra-ui/react'
import {MdEdit,MdDelete} from "react-icons/md";
import {AiFillEye} from "react-icons/ai"
import {Link} from "react-router-dom"
import axios from "axios";
import Popup from "../../components/Popup"
import EditUser from "./EditUser";
import {useNavigate} from "react-router-dom";

const formateDate = (date) => {
	const dateArr = new Date(date).toLocaleDateString().split('/')
	return `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
}

const UserList = () => {
	const [users,setUsers] = useState([]) 
	const [isLoading,setIsLoading] = useState(false)
	const navigate = useNavigate();
	const [modalData,setModalData] = useState({})
	const [render,setRender] = useState(false);
	const [userId,setUserId] = useState(null);
	const [isModal,setIsModal] = useState(false)
	useEffect(() => {
		axios.get('http://localhost:5000/api/get/user').then(res=>{
			setUsers(res.data)
		}).catch(err=>{
			console.log(err)
		})
	}, [isModal,render])

	const deleteUser = async(userId) =>{
		setIsLoading(true)
		const isDelete = window.confirm('Are you want to delete this user ?');
		if(isDelete){
			const res = await axios.delete(`http://localhost:5000/api/delete/user/${userId}`).catch(err=>{
				console.log(err)
				setIsLoading(false)
			})
			if(res.data?.status==="success"){
				alert('user deleted successfully');
				setIsLoading(false)
			}
		}
		setIsLoading(false)
	}
	return (
		<container style={{display:"flex",justifyContent:'center'}}>
			<Box w='80%' bg='white' p={4} borderWidth='1px' borderRadius='lg' mt="10">
				<Flex p={4}>
					<h2 style={{fontWeight:600}}>USER LIST</h2>
					<Spacer/>
					<Link to="/createuser">
						<Button colorScheme='blue'>CREATE USER</Button>
					</Link>
				</Flex>
				<Table variant='simple'>
				  <TableCaption>User Management List</TableCaption>
				  <Thead>
				    <Tr>
				      <Th>#</Th>
				      <Th>Name</Th>
				      <Th>Email</Th>
				      <Th>Password</Th>
				      <Th>Phone No.</Th>
				      <Th>Code</Th>
				      <Th>Created At</Th>
				      <Th>Actions</Th>
				    </Tr>
				  </Thead>
				  <Tbody>
				   	{
				   		users.map((user,index)=>(
				   			<Tr>
				   			  <Td>{index+1}</Td>
				   			  <Td style={{textTransform:'capitalize'}}>{user.firstName} {user.lastName}</Td>
				   			  <Td>{user.email}</Td>
				   			  <Td>{user.password}</Td>
				   			  <Td>{user.phoneNumber}</Td>
				   			  <Td>{user.code}</Td>
				   			  <Td>{formateDate(user.createdAt)}</Td>
				   			  <Td>
				   			  	<IconButton
				   			  		isRounded={true}
				   			  		isDisabled={isLoading}
				   			  		size="sm"
				   			  	  icon={<AiFillEye style={{fontSize:'1.2rem'}}/>}
				   			  	  onClick={()=>{
				   			  	  	navigate(`/userimages/${user._id}`)
				   			  	  }}
				   			  	/>
				   			  	<IconButton
				   			  		isRounded={true}
				   			  		isDisabled={isLoading}
				   			  		size="sm"
				   			  		ml="2"
				   			  	  icon={<MdEdit style={{fontSize:'1.2rem'}}/>}
				   			  	  onClick={()=>{
				   			  	  	setModalData(user)
				   			  	  	setUserId(user._id)
				   			  	  	setIsModal(true)
				   			  	  }}
				   			  	/>
				   			  	<IconButton
				   			  		ml="2"
				   			  		isRounded={true}
				   			  		isDisabled={isLoading}
				   			  		size="sm"
				   			  	  icon={<MdDelete style={{fontSize:'1.2rem',color:'red'}}/>}
				   			  	  onClick={()=>{
				   			  	   	deleteUser(user._id)
				   			  	   	setRender(prev=>!prev)
				   			  	  }}
				   			  	/>
				   			  </Td>
				   			</Tr>
				   		))
				   	}
				  </Tbody>
				</Table>
			</Box >
			<Popup {...{isModal,setIsModal}} title="EDIT USER">
				<EditUser {...{userId,modalData,setIsModal}}/>
			</Popup>
		</container>
	)
}

export default UserList