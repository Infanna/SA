package controller


import (

        "github.com/Infanna/sa-64-example/entity"

        "github.com/gin-gonic/gin"

        "net/http"

		

)

// POST /users

func CreateUser(c *gin.Context) {

	var user entity.User

	if err := c.ShouldBindJSON(&user); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if err := entity.DB().Create(&user).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}

// GET /users


func ListUser(c *gin.Context) {


	var users []entity.User
	if err := entity.DB().Raw("SELECT * FROM users").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})



}

