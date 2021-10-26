import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    })
);

function Home() {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.container} maxWidth="md">

                <h1 style={{ textAlign: "center" }}>ระบบบันทึกเวชระเบียน</h1>
                <h4>Requirements</h4>
                <p>
                ระบบทันตกรรมของโรงพยาบาล เป็นระบบที่ผู้ใช้ระบบซึ่งเป็นบุคลากรของโรงพยาบาลที่เป็นสมาชิก สามารถเข้าระบบเพื่อทำการบันทึกประวัติของผู้ป่วยก่อนเข้ารับการรักษา
                ในระบบนี้สามารถบันทึกข้อมูลเวชระเบียน ,สิทธิในการรักษา ,อาชีพ ของผู้ป่วย และมีการบันทึกว่าใครเป็นผู้บันทึกข้อมูลตามวันเวลาปัจจุบัน

                </p>
            </Container>
        </div>
    );
}
export default Home;
