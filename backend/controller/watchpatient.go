package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"
		
)
func CreateWatchPatient(c *gin.Context) {

	var insurance entity.Insurance
	var job entity.Job
	var sex entity.Sex
	var user entity.User
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

	// 12: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", patient.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// 13: สร้าง Patient
	wp := entity.Patient{
		Insurance:	 insurance,         // โยงความสัมพันธ์กับ Entity insurance
		Job:       	 job,               // โยงความสัมพันธ์กับ Entity job
		Sex:    	 sex,               // โยงความสัมพันธ์กับ Entity sex
		User:		 user,				// โยงความสัมพันธ์กับ Entity user
	}

	// 15: บันทึก
	if err := entity.DB().Create(&wp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wp})
}


// GET /users


func ListWatchPatient(c *gin.Context) {


	var wpats []entity.Patient
	if err := entity.DB().Preload("Sex").Preload("Job").Preload("User").Preload("Insurance").Raw("SELECT * FROM patients").Find(&wpats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": wpats})

}

