package entity

import (
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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
		JobName:			"นักศึกษา",
	}
	db.Model(&Job{}).Create(&job1)


	insurance1 := Insurance{
		InsuranceName:		"ประกันสุขภาพ30บาท",
		Detail:				"ค่าใช้จ่ายของผู้ป่วยทั้งหมด 30 บาท",
	}
	db.Model(&Insurance{}).Create(&insurance1)

	insurance2 := Insurance{
		InsuranceName:		"ประกันสังคม",
		Detail:				"เบิกจากรัฐได้",
	}
	db.Model(&Insurance{}).Create(&insurance2)


	us1 := User{
		Name:			"สมชาย มาบันทึก",
		UserName:		"qwert",
		Pass:			"12345",
	}
	db.Model(&User{}).Create(&us1)

	patient1 := Patient{
		PatientFirstname:	"patcharachart",
		PatientLastname:	"jirasrisopa",
		PatientAge:			20,
		PatientIDcard:		"1329901010000",
		PatientTel:			"0902571569",
		PatientTime: 		time.Now(),
		Sex:				sex1,
		Job:				job1,
		Insurance:			insurance1,
		User:				us1,
		
	}
	db.Model(&Patient{}).Create(&patient1)

	patient2 := Patient{
		PatientFirstname:	"asd",
		PatientLastname:	"gggg",
		PatientAge:			10,
		PatientIDcard:		"1329900010000",
		PatientTel:			"0808571549",
		PatientTime: 		time.Now(),
		Sex:				sex2,
		Job:				job1,
		Insurance:			insurance1,
		User:				us1,
		
	}
	db.Model(&Patient{}).Create(&patient2)




}