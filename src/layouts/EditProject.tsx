import React, { useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { PrivilegeTable } from '../components/projectAdminsTable'
import { TextField} from '@mui/material'
import { ManageDialog } from '../components/dialogue'
import { Link, useNavigate , useParams} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from '../api/axios';


export const EditProject = () => {
  const navigate = useNavigate();
  const auth = useAuthContext(); 
  let {id} = useParams()
  console.log(id);
  console.log("%µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ*******************************************");
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [role, setRole] = React.useState('')
  const [uploaded, setUploaded] = React.useState('')
  const [memebers , setMembers] = React.useState([])
  const [update , setUpdate] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  console.log("aziiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiz")
  console.log(uploaded)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClick = ()=>  {
    // Redirect the user to the new website URL
    window.location.href = 'http://127.0.0.1:8000'+uploaded+'/';
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setUpdate(true);
  };
  const handleUpdate = () => {
 
    setUpdate(false);
    setUpdate(true);
  };

  useEffect(()=>{
    if(status=="1"){
      setStatus("open")

    } 
    if(status=="2"){
      setStatus("closed")

    }
    if(status=="0"){
      setStatus("not verified yet")
    }


  },[status])
  const deleteProject = () => {
    
    axios.delete("http://127.0.0.1:8000/projects/project-delete/"+id+"/", 
      {
        headers: { 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${auth?.user?.access}`,
      },
      


      

      }
    ).then((response) => {
      // TODO: remove console.logs before deployment
   
      //navigate("/", { replace: true })

  

  }).catch((err)=>{
    if (!err) {
      console.log('No Server Response');
    }  else {
      console.log(err)
      console.log('No data' )
    }
  }) ;
  

 
  }
  const handleUpdateProject = () => {
    axios.post("http://127.0.0.1:8000/projects/project-update/"+id+"/", {title:title,description:description},
    {
      headers: { 'Content-Type': 'application/json',
                  "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

        }
      ).then((response) => {
        // TODO: remove console.logs before deployment
        setTitle(response.data.title)
        setDescription(response.data.description)
        setStatus(response.data.status)
        setRole(response.data.role)
        console.log("zzzssz",response.data)
        //  navigate(`activeProjects/edit/`, {id , title : paramTitle, description : paramDescription, status : paramStatus, role: paramRole, uploaded:paramUploaded})
        


    }).catch((err)=>{
      if (!err) {
        console.log('No Server Response');
      }  else {
        console.log(err)
        console.log('No data' )
      }
    }) ;
  }
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/projects/ProjectInformations/'+id+'/')
      .then(response => {
        setTitle(response.data[0].title);
        setDescription(response.data[0].description);
        setStatus(response.data[0].status);
        setRole(response.data[0].user_permission);
        setUploaded(response.data[0].uploaded);
        
      console.log(response.data[0].uploaded)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const projectInformations = () => {
    
    const response = axios.get("http://127.0.0.1:8000/projects/ProjectInformations/"+id+"/", 
      {
        headers: { 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${auth?.user?.access}`,
      },
      


      

      }
    ).then((response) => {
      console.log("aziiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiz")
      console.log(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setStatus(response.data.status)
      setRole(response.data.role)
      // TODO: remove console.logs before deployment
   
      //navigate("/", { replace: true })

  

  }).catch((err)=>{
    if (!err) {
      console.log('No Server Response');
    }  else {
      console.log(err)
      console.log('No data' )
    }
  }) ;
  

 
  }


   React.useEffect( ()=>{

      axios.get("http://127.0.0.1:8000/projects/project-members/list/"+id+"/", 
       {
         headers: { 'Content-Type': 'application/json',
                      "Authorization": `Bearer ${auth?.user?.access}`,
        },
        


        

       }
     ).then((response) => {
          // TODO: remove console.logs before deployment
        // console.log("zzzzzz:",JSON.parse(response?.data));

        setMembers(JSON.parse(response?.data))
        

    
   
   }).catch((err)=>{
     if (!err) {
       console.log('No Server Response');
     }  else {
        console.log(err)
        console.log('No data' )
     }
   }) ;

 })//,[,update]


  React.useEffect(() => {
    projectInformations()
  }, [ open])
  

  return (
    <Grid container padding={5}  
    direction="row"
    justifyContent="space-between"
    alignItems="center">
      
      <Box component="form"   noValidate sx={{ mt: 1 }}>
        <div>EDIT PROJECT</div>
          <Button variant="contained" color="error" disabled={role==="viewer"}  onClick={deleteProject}> delete project</Button>
          <TextField
              value={title}
              margin="normal"
              required
              fullWidth
              id="title"
              // label="title"
              name="title"
              autoComplete="title" 
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              // label="description"
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
            <TextField
              value= {status}
              margin="normal"
              required
              fullWidth
              id="status"
              // label="status"
              name="status"
              autoComplete="status"
              
              multiline
              disabled
            />
            
            
      <Button variant="contained" disabled={role==="viewer"} color="success" onClick={handleClickOpen}>add member</Button >
      <br />


        {role!=="viewer"?

          <>
          
              {memebers.length>0 || update?
              
                  <>
                      <div>PROJECT MEMBERS</div>
                      <br />
                      <PrivilegeTable setMembers={setMembers} handleUpdate={handleUpdate} setUpdate={setUpdate}  disable={role==="viewer"} id={id} status={status} description={description} title={title} role={role} data={[...memebers]} />  
                  </>
                :""
            
            }
          
          
          </>
        
        :""
        
        }



<Button
      disabled={role==="viewer"} 
      onClick={handleClick}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >Download File</Button>

      <div>
        <button onClick={handleClick}>Click me to go to the new website</button>
      </div>


      <Button
      disabled={role==="viewer"} 
      onClick={handleUpdateProject}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >update project</Button>
    </Box>
    <ManageDialog open={open} handleClose={handleClose}  id={id} status={status} description={description} title={title} setUpdate={setUpdate} role={role}  />
    </Grid>
  )
}
