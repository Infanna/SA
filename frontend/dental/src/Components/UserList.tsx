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
import CreateIcon from "@material-ui/icons/AddCircleOutlineOutlined";



const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);



function WatchPatientList() {
  const classes = useStyles();

  const [pats, setWatchPatient] = React.useState<PatientInterface[]>([]);
  console.log("pats", pats)
  const getWatchPatient = async () => {

    const apiUrl = "http://localhost:8080/patients";

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

              ??????????????????????????????????????????

            </Typography>

          </Box>

          <Box>

            <Button

              component={RouterLink}

              to="/create"

              variant="contained"

              color="primary"

            >

              <CreateIcon />???????????????????????????????????????????????????

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

                  ????????????

                </TableCell>

                <TableCell align="left" width="10%">

                  ?????????????????????

                </TableCell>

                <TableCell align="left" width="6%">

                  ?????????

                </TableCell>

                <TableCell align="left" width="6%">

                  ????????????

                </TableCell>

                <TableCell align="left" width="10%">

                  ?????????????????????????????????????????????

                </TableCell>

                <TableCell align="left" width="8%">

                  ???????????????

                </TableCell>

                <TableCell align="left" width="10%">

                  ?????????????????????????????????????????????

                </TableCell>

                <TableCell align="left" width="8%">

                  ????????????????????????

                </TableCell>

                <TableCell align="left" width="10%">

                  ??????????????????????????????

                </TableCell>

                <TableCell align="left" width="10%">

                  ???????????????????????????

                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {pats.map((pats: PatientInterface) => (

                <TableRow key={pats.ID}>

                  <TableCell align="center">{pats.ID}</TableCell>

                  <TableCell align="left" size="medium"> {pats.Firstname} </TableCell>

                  <TableCell align="left">{pats.Lastname}</TableCell>

                  <TableCell align="left">{pats.Sex.Name}</TableCell>

                  <TableCell align="left">{pats.Age}</TableCell>

                  <TableCell align="left">{pats.IDcard}</TableCell>

                  <TableCell align="left">{pats.Job.Name}</TableCell>

                  <TableCell align="left">{pats.Insurance.Name}</TableCell>

                  <TableCell align="left">{pats.Tel}</TableCell>

                  <TableCell align="left">{moment(pats.Time).format("YYYY-MM-DD HH:mm")}</TableCell>

                  <TableCell align="left">{pats.UserNurse.Name}</TableCell>

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