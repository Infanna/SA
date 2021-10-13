import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import { PatientInterface } from "../models/IPat";


import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { minWidth: 650},

   tableSpace: {marginTop: 20},

 })

);





/*const styles = themelist => ({
    paper: {
      width: '100%',
      marginTop: themelist.spacing.unit * 3,
      overflowX: 'auto',
    },
  });*/




function WatchPatientList() {
    const classes = useStyles();

    const [pats, setWatchPatient] = React.useState<PatientInterface[]>([]);

    const getWatchPatient = async () => {

      const apiUrl = "http://localhost:8080/wpats";
    
      const requestOptions = {
    
        method: "GET",
    
        headers: { "Content-Type": "application/json" },
    
      };
  
      fetch(apiUrl, requestOptions)
    
        .then((response) => response.json())
    
        .then((res) => {
    
          console.log(res.data);
    
          if (res.data) {
    
            setWatchPatient(res.data);
    
          } else {
    
            console.log("else");
    
          }
    
        });
    
    };
    
    
    
    useEffect(() => {
    
      getWatchPatient();
    
    }, []);
   
    

    return (
   
      <div>
   
        <Container className={classes.container} maxWidth="xl" >
            
          <Box display="flex">
   
            <Box flexGrow={1}>
   
              <Typography
   
                component="h2"
   
                variant="h6"
   
                color="primary"
   
                gutterBottom
   
              >
   
                ระเบียนผู้ป่วย
   
              </Typography>
   
            </Box>
   
            <Box>
   
              <Button
   
                component={RouterLink}
   
                to="/create"
   
                variant="contained"
   
                color="primary"
   
              >
   
                สร้างประวัติใหม่
   
              </Button>
   
            </Box>
   
          </Box>
   
          <TableContainer component={Paper} className={classes.tableSpace}>
   
            <Table className={classes.table} aria-label="simple table">
   
              <TableHead>
   
                <TableRow>
   
                  <TableCell align="center" width="4%">
   
                    ID
   
                  </TableCell>
   
                  <TableCell align="left" width="10%">
   
                    ชื่อ
   
                  </TableCell>
   
                  <TableCell align="left" width="10%">
   
                    นามสกุล
   
                  </TableCell>
   
                  <TableCell align="left" width="6%">
   
                    เพศ
   
                  </TableCell>
   
                  <TableCell align="left" width="6%">
   
                    อายุ
   
                  </TableCell>
   
                  <TableCell align="left" width="10%">
   
                    รหัสบัตรประชาชน
   
                  </TableCell>

                  <TableCell align="left" width="8%">
   
                    อาชีพ

                  </TableCell>

                  <TableCell align="left" width="10%">
   
                    สิทธิในการรักษา

                  </TableCell>

                  <TableCell align="left" width="10%">
   
                    เบอร์โทร

                  </TableCell>

                  <TableCell align="left" width="10%">
   
                    เวลาบันทึก

                  </TableCell>

                  <TableCell align="left" width="10%">
   
                    ผู้บันทึก

                  </TableCell>
   
                </TableRow>
   
              </TableHead>
   
              <TableBody>
   
                {pats.map((pats: PatientInterface) => (
   
                  <TableRow key={pats.ID}>
   
                    <TableCell align="right">{pats.ID}</TableCell>
   
                    <TableCell align="left" size="medium"> {pats.PatientFirstname} </TableCell>
   
                    <TableCell align="left">{pats.PatientLastname}</TableCell>

                    <TableCell align="left">{pats.Sex.SexName}</TableCell>

                    <TableCell align="left">{pats.PatientAge}</TableCell>

                    <TableCell align="left">{pats.PatientIDcard}</TableCell>

                    <TableCell align="left">{pats.Job.JobName}</TableCell>
              
                    <TableCell align="left">{pats.Insurance.InsuranceName}</TableCell>

                    <TableCell align="left">{pats.PatientTel}</TableCell>

                    <TableCell align="left">{moment(pats.PatientTime).format("YYYY-MM-DDTHH:mm")}</TableCell>

                    <TableCell align="left">{pats.User.Name}</TableCell>

                   
   
                  </TableRow>
   
                ))}
   
              </TableBody>
   
            </Table>
   
          </TableContainer>

        </Container>
   
      </div>
   
    );
}
export default WatchPatientList;