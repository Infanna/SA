package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

)

// POST /Insurance

func CreateInsurance(c *gin.Context) {

	var insr entity.Insurance

	if err := c.ShouldBindJSON(&insr); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&insr).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": insr})

}

// GET /Insurances


func ListInsurance(c *gin.Context) {


	var insrs []entity.Insurance
	if err := entity.DB().Raw("SELECT * FROM insurances").Find(&insrs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": insrs})

}

// GET id / Detail

func GetDetail(c *gin.Context) {


	var details entity.Insurance

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM insurances WHERE id = ?", id).Scan(&details).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": details})


}

