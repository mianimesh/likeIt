import React from 'react' ;
import {Box,Grid} from '@material-ui/core' ;
const PrintPost = (props)=>{
    return (
        <Grid container justify="center" alignItems="center">
        <Box borderColor="primary.main"className='box-post' width={12/20} bgcolor="success.main"> 
            <Box bgcolor="#1f4b59" border={2} borderColor="primary.main" className='box-title'><b>{props.title}</b></Box>
            <Box bgcolor="#055ba6"  border={2} borderColor="primary.main">{props.body}</Box>
        </Box>
        </Grid>
    );
}
export default PrintPost ;