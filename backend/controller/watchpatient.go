package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /users

func CreateWatchPatient(c *gin.Context) {

	var wpat entity.Patient

	if err := c.ShouldBindJSON(&wpat); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&wpat).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": wpat})

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

