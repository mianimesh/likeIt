import React from 'react' ; 
import {InputLabel,Input,Typography,Grid,Button,Box} from '@material-ui/core' ; 

const Login = (props) =>{

    const {email
        ,setEmail
        ,password
        ,setPassword
        ,handleLogin
        ,handleSignup
        ,hasAccount
        ,setHasAccount
        ,emailError
        ,passwordError
    } = props ; 
    return(
        <Grid className='grid-login'>
        <Box className='login-box' width={1/4} border={1} style={{padding:30, marginTop:50, backgroundColor: '#aadc91'}} textAlign='center'>
            <Grid>
                <InputLabel style={{color:'black'}}>Username</InputLabel>
                <Input type="text" 
                autoFocus
                required
                value={email}
                 onChange={(e)=> setEmail(e.target.value)}/>

                <p className="errorMsg">{emailError}</p>
                <InputLabel style={{color:'black'}}>Password</InputLabel>
                <Input variant='secondary' type="password" 
                required
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <Grid>
                    {hasAccount?(
                        <>
                        <Button onClick={handleLogin}>Sign in</Button>
                        <p>Don't have an Account ?<Button onClick={()=>setHasAccount(!hasAccount)}>Sign up</Button></p>
                        </>
                    ) : (
                        <>
                        <Button onClick={handleSignup}>Sign up</Button>
                        <p>Have an Account<Button onClick={()=>setHasAccount(!hasAccount)}>Sign in</Button></p>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
        </Grid>
    )
}

export default Login ; 