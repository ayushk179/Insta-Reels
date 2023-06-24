import React, { Component } from 'react'
import {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import insta from '../Assets/Instagram.JPG'
import { makeStyles } from '@mui/styles';
import './Signup.css'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { storage ,database } from '../firebase';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'


export default function Signup() {
    const useStyles = makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
            height:'7vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
    const [e,sete]= useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);

    const handleClick = async() => {
        if(file==null){
            setError("Please upload profile image first");
            sete(true)
            setLoading(true)
            setTimeout(()=>{
                setError('')
                setLoading(false)
            },2000)
           
            return;
        }
        try{
            setError('')
            setLoading(true)
            let userObj = await signup(email,password)
            let uid = userObj.user.uid
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                setError(((JSON.stringify(error.code)).substring(6)));
                sete(false)
                setLoading(true)
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate('/');
            }
        }
        catch(error){
            setError(((JSON.stringify(error.code)).substring(6)))
            // console.log("hello");
            sete(false)
            setLoading(true);
            setTimeout(()=>{
                setError('')
            },2000)
            setLoading(false);

        }
    }

  return (
    <div className="loginWrapper">
        <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
        <div className="car">
          <CarouselProvider
              visibleSlides={1}
              totalSlides={5}
              // step={3}
              naturalSlideWidth={238}
              naturalSlideHeight={423}
              hasMasterSpinner
              isPlaying={true}
              infinite={true}
              dragEnabled={false}
              touchEnabled={false}
          >
              <Slider>
              <Slide index={0}><Image src={img1}/></Slide>
              <Slide index={1}><Image src={img2}/></Slide>
              <Slide index={2}><Image src={img3}/></Slide>
              <Slide index={3}><Image src={img4}/></Slide>
              <Slide index={4}><Image src={img5}/></Slide>
              </Slider>
          </CarouselProvider>
        </div>
    </div>
    <div className="signupWrapper">
    <div className="signupCard">
    <Card variant='outlined'>
    <div className="insta-logo">
                    <img src={insta} alt="" />
                    </div>
      <CardContent>
      <Typography  variant="subtitle1">
                        Sign up to see photos and videos from your friends
                    </Typography>
                    {
                    error!='' && e!=true && <Alert severity="error">ERROR :"{error}</Alert>
}
{
                    error!='' && e!=false && <Alert severity="error">ERROR :"{error}"</Alert>

                    
                    }
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small"value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Button color="secondary" fullWidth={true} variant="outlined" margin="dense"  component="label">
                    Upload Profile Image
                    <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])} />
                    </Button>
                    </CardContent>
                    <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick} > 
                    Sign up
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        By signing up, you agree to our Terms, Conditions and Cookies policy.
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Having an account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
                    </Typography>
                    <div>

                    </div>
                </CardContent>
            </Card>

      
       </div>
    </div>
    </div>
  );

}