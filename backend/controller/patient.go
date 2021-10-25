package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /pat

func CreatePatient(c *gin.Context) {

	var insurance entity.Insurance
	var job entity.Job
	var sex entity.Sex
	var nurse entity.User
	var patient entity.Patient


	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา insurance ด้วย id
	if tx := entity.DB().Where("id = ?", patient.InsuranceID).First(&insurance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insurance not found"})
		return
	}

	// 10: ค้นหา sex ด้วย id
	if tx := entity.DB().Where("id = ?", patient.SexID).First(&sex); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sex not found"})
		return
	}

	// 11: ค้นหา job ด้วย id
	if tx := entity.DB().Where("id = ?", patient.JobID).First(&job); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Job not found"})
		return
	}

	// 12: ค้นหา nurse ด้วย id
	if tx := entity.DB().Where("id = ?", patient.UserID).First(&nurse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	entity.DB().Joins("Role").Find(&nurse)
	// ตรวจสอบ Role ของ user
	if nurse.Role.RoleName != "Nurse" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Nurses"})
		return
	}
				
/*	if err := entity.DB().Preload("Role").Raw("SELECT role_name FROM users WHERE id = ?", patient.UserID).First(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Nurses"})
		return
	}*/

/*	if tx := entity.DB().Where("id = ?", nurse.Role.ID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Nurses"})
		return
	}*/






	// 14: สร้าง Patient
	wp := entity.Patient{
		PatientFirstname: 	patient.PatientFirstname,
		PatientLastname: 	patient.PatientLastname,
		PatientAge:			patient.PatientAge,
		PatientIDcard:  	patient.PatientIDcard,
		PatientTel:			patient.PatientTel,
		PatientTime: 		patient.PatientTime, // 13: ดึงเวลาปัจจุบัน
		Insurance:	 		insurance,         // โยงความสัมพันธ์กับ Entity insurance
		Job:       	 		job,               // โยงความสัมพันธ์กับ Entity job
		Sex:    	 		sex,               // โยงความสัมพันธ์กับ Entity sex
		User:		 		nurse,				// โยงความสัมพันธ์กับ Entity user
		
	}

	// 15: บันทึก
	if err := entity.DB().Create(&wp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wp})

}

// GET /pats


func ListPatient(c *gin.Context) {


	var pats []entity.Patient
	if err := entity.DB().Preload("Sex").Preload("Job").Preload("User").Preload("Insurance").Raw("SELECT * FROM patients").Find(&pats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pats})




}

