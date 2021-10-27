package controller

import (
	"github.com/Infanna/sa-64-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /appoint
func CreateAppoint(c *gin.Context) {

	var appoint entity.Appoint
	var patient entity.Patient
	var remedytype entity.RemedyType
	var dentist entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Appoint
	if err := c.ShouldBindJSON(&appoint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// 10: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.UserDentistID).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 11: ค้นหา remedytype ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.RemedyTypeID).First(&remedytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "remedytype not found"})
		return
	}

	// 12: สร้าง Appoint
	ap := entity.Appoint{
		Patient:     patient,    // โยงความสัมพันธ์กับ Entity Patient
		RemedyType:  remedytype, // โยงความสัมพันธ์กับ Entity RemedyType
		UserDentist: dentist,    // โยงความสัมพันธ์กับ Entity User
		Todo:        appoint.Todo,
		AppointTime: appoint.AppointTime, // ตั้งค่าฟิลด์ Time
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ap).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ap})
}

// GET /Appoint/:id
func GetAppoint(c *gin.Context) {
	var appoint entity.Appoint
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("RemedyType").Preload("User").Raw("SELECT * FROM appoints WHERE id = ?", id).Find(&appoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appoint})
}

// GET /appoints
func ListAppoint(c *gin.Context) {
	var appoints []entity.Appoint
	if err := entity.DB().Preload("Patient").Preload("RemedyType").Preload("User").Raw("SELECT * FROM appoints").Find(&appoints).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": appoints})
}