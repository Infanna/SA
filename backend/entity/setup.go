package entity

import (
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"

)


var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&User{}, &Job{}, &Insurance{}, &Patient{}, &Sex{},
	)


	db = database

	sex1 := Sex{
		SexName:			"ชาย",

	}
	db.Model(&Sex{}).Create(&sex1)

	sex2 := Sex{
		SexName:			"หญิง",

	}
	db.Model(&Sex{}).Create(&sex2)

	job1 := Job{
		JobName:			"ราชการ",
	}
	db.Model(&Job{}).Create(&job1)

	job2 := Job{
		JobName:			"รัฐวิสหกิจ",
	}
	db.Model(&Job{}).Create(&job2)

	job3 := Job{
		JobName:			"นักศึกษา",
	}
	db.Model(&Job{}).Create(&job3)


	insurance1 := Insurance{
		InsuranceName:		"สิทธิสวัสดิการข้าราชการ",
		Detail:				"ข้าราชการและบคุคลในครอบครัวสามารถใช้สิทธิ์เบิกจ่ายตรง โดยใช้บัตรประชาชนในการเข้ารับบริการรักษาพยาบาลประเภทผู้ป่วยนอกทุกครั้ง ณ จุดชำระเงินโดยหากไม่ได้นำบัตรประชาชนมาแสดง หรือเอกสารที่กรมบัญชีกลางกำหนด ผู้รับบริการจะต้องสำรองจ่ายเงินค่ารักษาพยาบาลไปก่อน แล้วนำใบเสร็จรับเงินไปเบิกคืนกับส่วนราชการต้นสังกัด",
	}
	db.Model(&Insurance{}).Create(&insurance1)

	insurance2 := Insurance{
		InsuranceName:		"สิทธิประกันสังคม",
		Detail:				"สามารถใช้สิทธิ์ได้เฉพาะกรณีที่มีใบส่งตัวมาจากโรงพยาบาลต้นสังกัด และชำระเงินสดเท่านั้น ยกเว้น กรณีมีใบส่งตัวยืนยันการให้วางบิลโรงพยาบาลต้นสังกัดได้ ",
	}
	db.Model(&Insurance{}).Create(&insurance2)

	insurance3 := Insurance{
		InsuranceName:		"สิทธิหลักประกันสุขภาพ 30 บาท",
		Detail:				"คุ้มครองบุคคลที่เป็นคนไทยมีเลขประจำตัวประชาชน 13 หลักที่ไม่ได้รับสิทธิสวัสดิการข้าราชการ หรือ สิทธิประกันสังคม หรือสิทธิสวัสดิการรัฐวิสาหกิจ หรือสิทธิอื่น ๆ จากรัฐ",
	}
	db.Model(&Insurance{}).Create(&insurance3)

	ro1 :=Role{
		RoleName:		"Nurse",
	}
	db.Model(&Role{}).Create(&ro1)

	ro2 :=Role{
		RoleName:		"Cashier",
	}
	db.Model(&Role{}).Create(&ro2)

	password1, err := bcrypt.GenerateFromPassword([]byte("12345"), 14)

	us1 := User{
		Name:			"สมชาย มาบันทึก",
		UserName:		"qwert",
		Password: 		string(password1),
		Role:			ro1,
	}
	db.Model(&User{}).Create(&us1)

	password2, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	us2 := User{
		Name:			"สมหญิง มาจด",
		UserName:		"asdfg",
		Password: 		string(password2),
		Role:			ro1,
	}
	db.Model(&User{}).Create(&us2)

	us3 := User{
		Name:			"สมศรี มาคิดเงิน",
		UserName:		"zxcvb",
		Password: 		string(password2),
		Role:			ro2,
	}
	db.Model(&User{}).Create(&us3)



	patient1 := Patient{
		PatientFirstname:	"พัชรชาติ",
		PatientLastname:	"จิรศรีโสภา",
		PatientAge:			20,
		PatientIDcard:		"1329900000000",
		PatientTel:			"0902571569",
		PatientTime: 		time.Now(),
		Sex:				sex1,
		Job:				job3,
		Insurance:			insurance3,
		User:				us1,
		
	}
	db.Model(&Patient{}).Create(&patient1)

	patient2 := Patient{
		PatientFirstname:	"สมหญิง",
		PatientLastname:	"ซิ่งรถไถ",
		PatientAge:			26,
		PatientIDcard:		"1329900000001",
		PatientTel:			"0808571549",
		PatientTime: 		time.Now(),
		Sex:				sex2,
		Job:				job1,
		Insurance:			insurance1,
		User:				us1,
		
	}
	db.Model(&Patient{}).Create(&patient2)




}