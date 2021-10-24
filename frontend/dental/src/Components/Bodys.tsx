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
import { JobInterface } from "../models/IJob";
import { InsuranceInterface } from "../models/IIns";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "react-time"
import { useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";


function Alert(props: AlertProps): JSX.Element {

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

    const [detail, setDetail] = React.useState<String>();


    const DetailChange = (event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const InsuranceIDValue = event.target.value as keyof typeof ins
        const InsuranceID = parseInt(String(InsuranceIDValue))

        console.log("DetailChange ID =", InsuranceID)
        for (let i = 0; i < ins.length; i++) {
            if (ins[i].ID == InsuranceID) {
                setDetail(ins[i].Detail);
                break
            }
            else {
                setDetail("");
            }

        }

    };

    
    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof pats
        console.log("Name", name)
        setPatient({
            ...pats,
            [name]: event.target.value,
        });
    };


    //ดึงข้อมูลเพศ
    const [sexs, setSex] = React.useState<SexInterface[]>([]);

    function getSex() {
        const apiUrl = "http://localhost:8080/sexs";

        const requestOptions = {

            method: "GET",

            headers: { "Content-Type": "application/json" },


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

    //ดึงข้อมูลอาชีพ
    const [jobs, setJob] = React.useState<JobInterface[]>([]);

    function getJob() {
        const apiUrl = "http://localhost:8080/jobs";

        const requestOptions = {

            method: "GET",

            headers: { "Content-Type": "application/json" },


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
    //ดึงข้อมูลสิทธิในการรักษา
    const [ins, setIns] = React.useState<InsuranceInterface[]>([]);

    function getIns() {
        const apiUrl = "http://localhost:8080/insrs";

        const requestOptions = {

            method: "GET",

            headers: { "Content-Type": "application/json" },


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

    //ดึงข้อมูลUser
    const [users, setUser] = React.useState<UserInterface[]>([]);

    function getUser() {
        const apiUrl = "http://localhost:8080/users";

        const requestOptions = {

            method: "GET",

            headers: { "Content-Type": "application/json" },


        };

        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {
                console.log("Combobox_User", res)
                if (res.data) {

                    setUser(res.data);

                } else {

                    console.log("else");

                }

            });

    }

    //ดึงข้อมูล ใส่ combobox
    useEffect(() => {

        getSex();
        getJob();
        getIns();
        getUser();

    }, []);





    //สร้างข้อมูล
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

            PatientFirstname: pats.PatientFirstname ?? "",

            PatientLastname: pats.PatientLastname ?? "",

            PatientAge: typeof pats.PatientAge === "string" ? parseInt(pats.PatientAge) : NaN,

            PatientIDcard: pats.PatientIDcard ?? "",

            PatientTel: pats.PatientTel ?? "",

            PatientTime: new Date(),

            SexID: typeof pats.SexID === "string" ? parseInt(pats.SexID) : NaN,

            JobID: typeof pats.JobID === "string" ? parseInt(pats.JobID) : NaN,

            InsuranceID: typeof pats.InsuranceID === "string" ? parseInt(pats.InsuranceID) : NaN,

            UserID: typeof pats.UserID === "string" ? parseInt(pats.UserID) : 1,
        };
        console.log("Error Chack Sex", data.SexID, "\nError Chack Job", data.JobID, "\nError Chack Insurance", data.InsuranceID)

        if (data.PatientFirstname == "") {
            setErrorMessage("กรุณากรอกชื่อ")
            setError(true)
        } else if (data.PatientLastname == "") {
            setErrorMessage("กรุณากรอกนามสกุล")
            setError(true)
        } else if (!/\d/.test(data.PatientAge.toString()) || data.PatientAge <= 0) {
            setErrorMessage("อายุไม่ถูกต้อง")
            setError(true)
        } else if (isNaN(data.SexID)) {
            setErrorMessage("กรุณาเลือกเพศ")
            setError(true)
        } else if (!/^\d{13}$/.test(data.PatientIDcard.toString())) {
            setErrorMessage("เลขบัตรประชาชนไม่ถูกต้อง")
            setError(true)
        } else if (!/^\d{10}$/.test(data.PatientTel.toString())) {
            setErrorMessage("เบอร์โทรไม่ถูกต้อง")
            setError(true)
        } else if (isNaN(data.JobID)) {
            setErrorMessage("กรุณาเลือกอาชีพ")
            setError(true)
        } else if (isNaN(data.InsuranceID)) {
            setErrorMessage("กรุณาเลือกสิทธิในการรักษา")
            setError(true)
        }
        else {

            console.log("Data", data)

            const apiUrl = "http://localhost:8080/patient";

            const requestOptions = {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(data),

            };

            fetch(apiUrl, requestOptions)

                .then((response) => response.json())

                .then((res) => {
                    console.log("Res", res)
                    if (res.data) {

                        setSuccess(true);

                    } else {
                        if (res.error == "UNIQUE constraint failed: patients.patient_idcard") {
                            setErrorMessage("เลขบัตรประจำตัวประชาชนซ้ำ")
                        }
                        else {
                            setErrorMessage("บันทึกข้อมูลไม่สำเร็จ")
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

                    บันทึกข้อมูลสำเร็จ

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

                            label="กรอกชื่อ"

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

                            label="กรอกนามสกุล"

                            variant="outlined"

                            type="string"

                            size="medium"

                            onChange={handleInputChange}

                        />
                    </Grid>


                    <Grid item xs={2}>
                        <p>อายุ</p>
                        <TextField


                            type="number"

                            style={{ width: 140 }}

                            id="PatientAge"

                            label="กรอกอายุ"

                            variant="outlined"

                            InputProps={{ inputProps: { min: 1 } }}

                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl fullWidth variant="outlined" style={{ width: 140 }}>
                            <p>เพศ</p>
                            <Select

                                native
                                value={pats.SexID}
                                onChange={handleChange}
                                inputProps={{

                                    name: "SexID",
                                }}
                            >
                                <option aria-label="None" value="" >
                                    เลือกเพศ
                                </option>
                                {sexs.map((item: SexInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.SexName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                        <p>รหัสบัตรประจำตัวประชาชน</p>
                        <TextField

                            type="text"

                            style={{ width: 295 }}

                            id="PatientIDcard"

                            label="กรอกรหัสบัตรประจำตัวประชาชน"

                            variant="outlined"

                            onChange={handleInputChange}
                        />
                    </Grid>


                    <Grid item xs={3}>
                        <p>เบอร์โทร</p>
                        <TextField

                            type="tel"

                            style={{ width: 220 }}

                            id="PatientTel"

                            label="กรอกเบอร์โทร"

                            variant="outlined"

                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" style={{ width: 220 }}>
                            <p>อาชีพ</p>
                            <Select
                                native

                                value={pats.JobID}

                                onChange={handleChange}

                                inputProps={{
                                    name: "JobID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกอาชีพ
                                </option>
                                {jobs.map((item: JobInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.JobName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined" style={{ width: 295 }}>
                            <p>สิทธิในการรักษา</p>
                            <Select

                                native

                                value={pats.InsuranceID}
                                onChange={e => { handleChange(e); DetailChange(e) }}


                                inputProps={{
                                    name: "InsuranceID",
                                    id: "ID",
                                }}
                            >
                                <option aria-label="None" value="" >
                                    เลือกสิทธิในการรักษา
                                </option>
                                {ins.map((item: InsuranceInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.InsuranceName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={5} className={classes.root}>
                        <p>ข้อมูลสิทธิ</p>
                        <TextField

                            multiline
                            defaultValue = {detail}
                            rows={3}

                            disabled

                            type="text"

                            style={{ width: 450 }}

                            id="Detail"

                            variant="outlined"

                        />

                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined" style={{ width: 300 }}>
                            <p>ผู้บันทึก</p>
                            <Select
                                disabled

                                native
                            >
                                {users.map((item: UserInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
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
