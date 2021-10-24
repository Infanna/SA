import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Toolbar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        table: {
            Width: 700,
            marginTop: 50,
        },
        tableSpace: {
            marginTop: 20,
        },
    })
);

function Home() {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.container} maxWidth="md">
                <div className = {classes.table}> 
                    <Button style={{ float: "inline-start" }}
                        component={RouterLink}
                        to="/create"
                        variant="contained"
                        color="primary">
                        สร้างประวัติผู้ป่วยใหม่
                    </Button>

                    <Button style={{ float: "right" }}
                        component={RouterLink}
                        to="/list"
                        variant="contained"
                        color="primary">
                        รายชื่อผู้ป่วย
                    </Button>
                </div>
                <h1 style={{ textAlign: "center" }}>ระบบบันทึกการเข้าชมวีดีโอ</h1>
                <h4>Requirements</h4>
                <p>
                    ระบบวิดีโอสตรีมมิ่งของบริษัท MeFlix
                    เป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นสมาชิกสามารถ login เข้า
                    ระบบเพื่อชมวิดีโอผ่านกลไกลสตรีมมิ่งได้ โดย ระบบวิดีโอของ MeFlix
                    เป็นระบบที่สามารถบันทึก ของวิดีโอ (Resolutions) ประกอบ และนอกจากนี้
                    ตนเองได้ เพื่อเก็บรายการวิดีโอที่ต้องการดูซ้ำ ๆ และ แต่ละคนจะมี
                    PlayList พิเศษที่ชื่อ Watched โดย PlayList น้ีจะเก็บรายการวิดีโอทสี่
                    มาชิกคนนั้นดูไปแล้วอย่างอัตโนมัติ
                </p>
            </Container>
        </div>
    );
}
export default Home;
