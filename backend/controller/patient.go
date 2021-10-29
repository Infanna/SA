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


	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา nurse ด้วย id
	if tx := entity.DB().Where("id = ?", patient.UserNurseID).First(&nurse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
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

	entity.DB().Joins("Role").Find(&nurse)
	// 13: ตรวจสอบ Role ของ user
	if nurse.Role.Name != "Nurse" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only Nurses"})
		return
	}

	// 15: สร้าง Patient
	wp := entity.Patient{
		Firstname: 			patient.Firstname,
		Lastname: 			patient.Lastname,
		Age:				patient.Age,
		IDcard:  			patient.IDcard,
		Tel:				patient.Tel,
		Time: 				patient.Time, 	   // 14: ดึงเวลาปัจจุบัน
		Insurance:	 		insurance,         // โยงความสัมพันธ์กับ Entity insurance
		Job:       	 		job,               // โยงความสัมพันธ์กับ Entity job
		Sex:    	 		sex,               // โยงความสัมพันธ์กับ Entity sex
		UserNurse:		 	nurse,			   // โยงความสัมพันธ์กับ Entity user

	}

	// 16: บันทึก
	if err := entity.DB().Create(&wp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wp})

}

// GET /pats


func ListPatient(c *gin.Context) {


	var pats []entity.Patient
	if err := entity.DB().Preload("Sex").Preload("Job").Preload("UserNurse").Preload("Insurance").Raw("SELECT * FROM patients").Find(&pats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pats})




}

