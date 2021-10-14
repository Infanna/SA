package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /Job

func CreateJob(c *gin.Context) {

	var job entity.Job

	if err := c.ShouldBindJSON(&job); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&job).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": job})

}

// GET /Jobs


func ListJob(c *gin.Context) {


	var jobs []entity.Job
	if err := entity.DB().Raw("SELECT * FROM jobs").Find(&jobs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": jobs})


}

