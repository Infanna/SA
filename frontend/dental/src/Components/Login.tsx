import { Button, Container, createStyles, makeStyles, Paper, TableContainer, TextField, Theme } from '@material-ui/core';
import React, { useState} from 'react'
import { UserInterface } from "../models/IUser";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   root: { flexGrow: 1 },

   container: {marginTop: theme.spacing(2)},

   table: { minWidth: 650},

   tableSpace: {marginTop: 200},

 })

);




function Form(){
    const classes = useStyles();
    const adminUser = {
        Username: "admin",
        Pass:"admin123"
    }
    const [user, setUser] = React.useState<UserInterface[]>([]);
    return(
        <Container className={classes.container} maxWidth="sm">
            <TableContainer component={Paper} className={classes.tableSpace}>
            <Grid container spacing={2} className={classes.root}>
              
                <Grid item xs={6} md={6} >
                <p>Username</p>
                    <TextField style={{ width: 220 }}

                        id="PatientFirstname"

                        variant="outlined"

                        type="string"

                        size="medium"
        
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                <p>Password</p>
                    <TextField style={{ width: 220 }}

                        id="PatientFirstname"

                        variant="outlined"

                        type="string"

                        size="medium"
        
                    />
                </Grid>


                <Grid item xs={12} md={3} >
                <Button style={{ float: "left" }}
                        component={RouterLink}
                        to="/list"
                        variant="outlined"
                        color="primary">
                        Login
                </Button>
                </Grid>


            </Grid>
            </TableContainer>
        </Container>


)
}
export default Form ;