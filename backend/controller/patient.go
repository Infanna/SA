package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /pat

func CreatePatient(c *gin.Context) {

	var pat entity.Patient

	if err := c.ShouldBindJSON(&pat); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&pat).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": pat})

}

// GET /pats


func ListPatient(c *gin.Context) {


	var pats []entity.Patient
	if err := entity.DB().Raw("SELECT * FROM patients").Find(&pats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pats})



}

