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

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "react-time"
import { useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import SaveIcon from "@material-ui/icons/SaveAltOutlined";

import { PatientInterface } from "../models/IPat";
import { UserInterface } from "../models/IUser";
import { SexInterface } from "../models/ISex";
import { JobInterface } from "../models/IJob";
import { InsuranceInterface } from "../models/IIns";
import { AssignmentTwoTone } from "@mui/icons-material";



function Alert(props: AlertProps): JSX.Element {

    return <MuiAlert elevation={6} variant="filled" {...props} />;

}

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary},
        table: { minWidth: 20 }
    }));

export default function Bodys(this: any) {

    const [detail, setDetail] = React.useState<String>();

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        //console.log("Type value",typeof(event.target.value))
        if(event.target.name === "InsuranceID"){
            setDetail(ins.find(i => i.ID == event.target.value)?.Detail)
            if(event.target.value == ""){
                setDetail("")
            }
        }
        
        const name = event.target.name as keyof typeof pats
        console.log("Name", name)
        console.log("value", event.target.value)
        setPatient({
            ...pats,
            [name]: event.target.value,
        });
    };


    //????????????????????????????????????
    const [sexs, setSex] = React.useState<SexInterface[]>([]);

    function getSex() {
        const apiUrl = "http://localhost:8080/sexs";

        const requestOptions = {

            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },


        };

        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {
                console.log("Combobox_sex", res)
                if (res.data) {

                    setSex(res.data);

                } else {

                    console.log("else");

                }

            });

    }

    //??????????????????????????????????????????
    const [jobs, setJob] = React.useState<JobInterface[]>([]);

    function getJob() {
        const apiUrl = "http://localhost:8080/jobs";

        const requestOptions = {

            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },


        };


        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {
                console.log("Combobox_job", res)
                if (res.data) {

                    setJob(res.data);

                } else {

                    console.log("else");

                }

            });

    }

    //????????????????????????????????????????????????????????????????????????
    const [ins, setIns] = React.useState<InsuranceInterface[]>([]);

    function getIns() {
        const apiUrl = "http://localhost:8080/insrs";

        const requestOptions = {

            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },


        };


        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {
                console.log("Combobox_Ins", res)
                if (res.data) {

                    setIns(res.data);

                } else {

                    console.log("else");

                }

            });

    }

    //real useronline
    const [Useronline, setUseronline] = React.useState<UserInterface>();

    function getUseronline() {
        const UserID = localStorage.getItem("uid")
        const apiUrl = `http://localhost:8080/users/${UserID}`;

        const requestOptions = {

            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },


        };

        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {
                console.log("Combobox_Useronline", res)

                if (res.data) {

                    setUseronline(res.data);

                } else {

                    console.log("else");

                }

            });

    }

    //??????????????????????????? ????????? combobox
    useEffect(() => {

        getUseronline();
        getSex();
        getJob();
        getIns();

    }, []);





    //?????????????????????????????????
    const [pats, setPatient] = React.useState<Partial<PatientInterface>>({});

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
        console.log("Value", value)
        console.log("ID", id)
        setPatient({ ...pats, [id]: value });

    };

    const [ErrorMessage, setErrorMessage] = React.useState<String>();



    function submit() {

        let data = {

            Firstname: pats.Firstname ?? "",

            Lastname: pats.Lastname ?? "",

            Age: typeof pats.Age === "string" ? parseInt(pats.Age) : NaN,

            IDcard: pats.IDcard ?? "",

            Tel: pats.Tel ?? "",

            SexID: typeof pats.SexID === "string" ? parseInt(pats.SexID) : NaN,

            JobID: typeof pats.JobID === "string" ? parseInt(pats.JobID) : NaN,

            InsuranceID: typeof pats.InsuranceID === "string" ? parseInt(pats.InsuranceID) : NaN,

            UserNurseID: Number(localStorage.getItem("uid")),

        };
        console.log("Error Chack Sex", data.SexID, "\nError Chack Job", data.JobID, "\nError Chack Insurance", data.InsuranceID)

        if (!/\S/.test(data.Firstname)) {
            setErrorMessage("???????????????????????????????????????")
            setError(true)
        } else if (!/\S/.test(data.Lastname)) {
            setErrorMessage("????????????????????????????????????????????????")
            setError(true)
        } else if (!/\d/.test(data.Age.toString()) || data.Age <= 0 ) {
            setErrorMessage("??????????????????????????????????????????")
            setError(true)
        } else if (isNaN(data.SexID)) {
            setErrorMessage("???????????????????????????????????????")
            setError(true)
        } else if (!/^\d{13}$/.test(data.IDcard)) {
            setErrorMessage("????????????????????????????????????????????????????????????????????????")
            setError(true)
        } else if (!/^\d{10}$/.test(data.Tel) && data.Tel != "") {
            setErrorMessage("??????????????????????????????????????????????????????")
            setError(true)
        } else if (isNaN(data.JobID)) {
            setErrorMessage("?????????????????????????????????????????????")
            setError(true)
        } else if (isNaN(data.InsuranceID)) {
            setErrorMessage("???????????????????????????????????????????????????????????????????????????")
            setError(true)
        }
        else {

            console.log("Data", data)

            const apiUrl = "http://localhost:8080/patient";

            const requestOptions = {

                method: "POST",

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(data),

            };

            fetch(apiUrl, requestOptions)

                .then((response) => response.json())

                .then((res) => {
                    console.log("Res", res)
                    if (res.data) {

                        setSuccess(true);

                    } else {
                        if (res.error == "UNIQUE constraint failed: patients.idcard") {
                            setErrorMessage("???????????????????????????????????????????????????????????????????????????")
                        } else if (res.error == "Only Nurses") {
                            setErrorMessage("Only Nurses")
                        } else {
                            setErrorMessage("???????????????????????????????????????????????????????????????")
                        }

                        setError(true)


                    }

                });
        }

    }

    const classes = useStyles();

    return (
        <Container className={classes.container} maxWidth="md">

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="success">

                    ??????????????????????????????????????????????????????

                </Alert>

            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">

                    {ErrorMessage}

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
                        ????????????????????????????????????????????????

                        <Button style={{ float: "right" }}
                            component={RouterLink}
                            to="/list"
                            variant="contained"
                            color="primary">
                            <ListIcon />??????????????????????????????????????????
                        </Button>



                    </Typography>
                </Box> </Box>
                <Divider />
                <Grid container spacing={4} className={classes.root}>


                    <Grid item xs={3} >
                        <p>????????????</p>
                        <TextField style={ {width: '110%'} }

                            id="Firstname"
                            
                            label="????????????????????????"
                            
                            variant="outlined"

                            type="string"

                            size="medium"

                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3} >
                        <p>?????????????????????</p>
                        <TextField style={{ width: '110%' }}

                            id="Lastname"

                            label="?????????????????????????????????"

                            variant="outlined"

                            type="string"

                            size="medium"

                            onChange={handleInputChange}

                        />
                    </Grid>


                    <Grid item xs={2}>
                        <p>????????????</p>
                        <TextField

                            
                            type="number"

                            style={{ width: '110%' }}

                            id="Age"

                            label="????????????????????????"

                            variant="outlined"

                            InputProps={{ inputProps: { min: 1 ,max: 150} }}

                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl fullWidth variant="outlined" style={{ width: '70%' }}>
                            <p>?????????</p>
                            <Select

                                native
                                value={pats.SexID}
                                onChange={handleChange}
                                inputProps={{

                                    name: "SexID",
                                }}
                            >
                                <option aria-label="None" value="" >
                                    ????????????????????????
                                </option>
                                {sexs.map((item: SexInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                        <p>?????????????????????????????????????????????????????????????????????</p>
                        <TextField

                            type="text"

                            style={{ width: '108%' }}

                            id="IDcard"

                            label="?????????????????????????????????????????????????????????????????????????????????"

                            variant="outlined"

                            onChange={handleInputChange}
                        />
                    </Grid>


                    <Grid item xs={3}>
                        <p>????????????????????????</p>
                        <TextField

                            type="tel"

                            style={{ width: '110%' }}

                            id="Tel"

                            label="????????????????????????????????????"

                            variant="outlined"

                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" style={{ width: '110%' }}>
                            <p>???????????????</p>
                            <Select
                                native

                                value={pats.JobID}

                                onChange={handleChange}

                                inputProps={{
                                    name: "JobID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    ??????????????????????????????
                                </option>
                                {jobs.map((item: JobInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined" style={{ width: '108%' }}>
                            <p>?????????????????????????????????????????????</p>
                            <Select

                                native

                                value={pats.InsuranceID}

                                onChange={handleChange}

                                inputProps={{
                                    name: "InsuranceID",
                                    id: "ID",
                                }}
                            >
                                <option aria-label="None" value="" >
                                    ????????????????????????????????????????????????????????????
                                </option>
                                {ins.map((item: InsuranceInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={5} className={classes.root}>
                        <p>?????????????????????????????????</p>
                        <TextField

                            multiline
                            defaultValue={detail}
                            rows={3}

                            disabled

                            type="text"

                            style={{ width: '128%' }}

                            id="Detail"

                            variant="outlined"

                        />

                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined" style={{ width: '108%' }}>
                            <p>???????????????????????????</p>
                            <Select
                                disabled
                                native
                            >
                                <option>
                                    {Useronline?.Name}
                                </option>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button style={{ float: "right" }}
                            variant="contained"
                            color="primary"
                            onClick={submit} >
                            <SaveIcon />??????????????????
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
