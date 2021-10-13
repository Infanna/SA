import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PatientInterface } from "../models/IPat";
import { UserInterface } from "../models/IUser";
import { SexInterface } from "../models/ISex";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { timePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import "react-time"
import { useEffect } from "react";
import { useState } from 'react';
import ComboBox from "./Sex";

function Alert(props: AlertProps) {

    return <MuiAlert elevation={6} variant="filled" {...props} />;

}




const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 }
    }));

export default function Bodys() {
    





    //สร้างข้อมูล
    const [user, setUser] = React.useState<Partial<PatientInterface>>({});

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {

        if (reason === "clickaway") {

            return;

        }

        setSuccess(false);

        setError(false);

    };


    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>
        
    ) => {

        const id = event.target.id as keyof typeof Bodys;

        const { value } = event.target;
        console.log("Value",value)
        console.log("ID",id)
        setUser({ ...user, [id]: value });

    };

    function submit() {

        let data = {

            PatientFirstname: user.PatientFirstname ?? "",

            PatientLastname: user.PatientLastname ?? "",

            PatientAge: typeof user.PatientAge === "string" ? parseInt(user.PatientAge) : 0,

            PatientIDcard: user.PatientIDcard,

            PatientTel: user.PatientTel,

            PatientTime: new Date(),

            SexID: typeof user.SexID === "string" ? parseInt(user.SexID) : 0,

            JobID: typeof user.JobID === "string" ? parseInt(user.JobID) : 0,

            InsuranceID: typeof user.InsuranceID === "string" ? parseInt(user.InsuranceID) : 0,
        };
        console.log("Data",data)

        const apiUrl = "http://localhost:8080/patient";

        const requestOptions = {
     
          method: "POST",
     
          headers: { "Content-Type": "application/json" },
     
          body: JSON.stringify(data),
     
        };
     
     
        fetch(apiUrl, requestOptions)
     
          .then((response) => response.json())
     
          .then((res) => {
            console.log("Res",res)
            if (res.data) {
     
              setSuccess(true);
     
            } else {
     
              setError(true);
     
            }
     
          });
          
    }


    const sex_select = [
        { title : "ชาย"},
        { title: "หญิง"},
    ];
    const job_select = [
        { title: 'ราชการ' },
        { title: 'รัฐวิสาหกิจ' },
        { title: 'บริษัทเอกชน' },
        { title: 'ค้าขาย' }
    ];
    const insurance_select = [
        { title: 'สวัสดิการของข้าราชการ' },
        { title: 'ประกันสังคม' },
        { title: 'หลักประกันสุขภาพ 30 บาท' }
    ];
    /*const User_select = [
        { title: 'สมชาย มาบันทึก' },
    ];*/
    const classes = useStyles();



    return (
        <Container className={classes.container} maxWidth="md">

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="success">

                    บันทึกข้อมูลสำเร็จ

                </Alert>

            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">

                    บันทึกข้อมูลไม่สำเร็จ

                </Alert>

            </Snackbar>


            <Paper className={classes.paper}>
                <Box display="flex"> <Box flexGrow={1}>
                    <Typography
                        component="h2"

                        variant="h5"

                        color="primary"

                        gutterBottom
                    >
                        บันทึกเวชระเบียน

                        <Button style={{ float: "right" }}
                            component={RouterLink}
                            to="/"
                            variant="contained"
                            color="primary">
                            รายชื่อ
                        </Button>


                    </Typography>
                </Box> </Box>
                <Divider />
                <Grid container spacing={4} className={classes.root}>


                    <Grid item xs={3} >
                        <p>ชื่อ</p>
                        <TextField style={{ width: 220 }}

                            id="PatientFirstname"

                            variant="outlined"

                            type="string"

                            size="medium"
                            
                            onChange={handleInputChange} 
                            />
                    </Grid>

                    <Grid item xs={3} >
                        <p>นามสกุล</p>
                        <TextField style={{ width: 220 }}

                            id="PatientLastname"

                            variant="outlined"

                            type="string"

                            size="medium"

                            onChange={handleInputChange}

                             />
                    </Grid>


                    <Grid item xs={2}>
                        <p>อายุ</p>
                        <TextField style={{ width: 140 }}

                            id="PatientAge"

                            label=""

                            variant="outlined"

                            onChange={handleInputChange}
                        />
                    </Grid>


                    <Grid item xs={3}>
                        <p>เพศ</p>
                        <Autocomplete
                            options={sex_select}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 150 }}
                            renderInput={(params) => <TextField {...params} 
                            
                            id="SexID"

                            label="" 
                            
                            variant="outlined" 

                            onChange={handleInputChange}
                            
                            />}
                        />
                    </Grid>


                    <Grid item xs={5}>
                        <p>รหัสบัตรประจำตัวประชาชน</p>
                        <TextField style={{ width: 360 }} 
                            id="PatientIDcard" 
                        
                            label="" 
                            
                            variant="outlined"                         

                            onChange={handleInputChange}
                            />
                    </Grid>


                    <Grid item xs={6}>
                        <p>เบอร์โทร</p>
                        <TextField style={{ width: 200 }} 
                            id="PatientTel" 
                            
                            label="" 
                            
                            variant="outlined" 

                            onChange={handleInputChange}
                            />
                    </Grid>

                    <Grid item xs={5}>
                        <p>อาชีพ</p>
                        <Autocomplete
                            options={job_select}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 360 }}
                            renderInput={(params) => <TextField {...params} 
                            
                            id="JobID"

                            label="" 
                            
                            variant="outlined" 
                            
                            
                            />}
                        />
                    </Grid>


                    <Grid item xs={4}>
                        <p>สิทธิในการรักษา</p>
                        <Autocomplete
                            options={insurance_select}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} 
                            
                            id="InsuranceID"

                            label=""
                            
                            variant="outlined" />}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <p>ข้อมูลสิทธิ</p>
                        <TextField

                            style={{ width: 755 }}
                            label=""
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </Grid>


                  

                    <Grid item xs={6}>
                        <p>ผู้บันทึก</p>
                        
                           
                        <TextField

                            style={{ width: 380 }}

                            label=""

                            defaultValue = "wuser.Name"

                            InputProps={{
                                readOnly: true,
                            }}
                            
                            variant="filled"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{ float: "right" }}
                            variant="contained"
                            color="primary"
                            onClick={submit} >
                            บันทึก
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
