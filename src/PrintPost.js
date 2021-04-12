import React from 'react' ;
import {Box,Grid} from '@material-ui/core' ;
const PrintPost = (props)=>{
    return (
        <Grid container justify="center" alignItems="center" justify="center">
        <Box border={2} borderColor="primary.main" className="box-post" width={12/20} bgcolor="success.main"> 
            <Box bgcolor="#1f4b59" border={2} borderColor="primary.main"><h3>{props.title}</h3></Box>
            <Box bgcolor="#055ba6"  border={2} borderColor="primary.main">{props.body}</Box>
            <Box border={2} borderColor="primary.main">
        </Box>
        </Box>
        </Grid>
    );
}
export default PrintPost ;