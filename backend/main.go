package main


import (

  "github.com/Infanna/sa-64-example/controller"

  "github.com/Infanna/sa-64-example/entity"

  "github.com/Infanna/sa-64-example/middlewares"

  "github.com/gin-gonic/gin"

)


func main() {

  entity.SetupDatabase()

  r := gin.Default()
  r.Use(CORSMiddleware())
  api := r.Group("")
	{
    protected := api.Use(middlewares.Authorizes())
		{
        // Insurance

        protected.GET("/insrs", controller.ListInsurance)

        protected.POST("/insr", controller.CreateInsurance)
  

        // Job

        protected.GET("/jobs", controller.ListJob)

        protected.POST("/job", controller.CreateJob)


        // Patient

        protected.GET("/patients", controller.ListPatient)

        protected.POST("/patient", controller.CreatePatient)


        // Sex

        protected.GET("/sexs", controller.ListSex)

        protected.POST("/sex", controller.CreateSex)
  

        // user

        protected.GET("/users", controller.ListUser)

        protected.GET("/users/:id", controller.GetUser)

  
        // role

        protected.GET("/roles", controller.ListRole)

        protected.POST("/role", controller.CreateRole)

      }
  }

	// Authentication Routes
	r.POST("/login", controller.Login)


  // Run the server

  r.Run()


}

func CORSMiddleware() gin.HandlerFunc {

  return func(c *gin.Context) {

    c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

    c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

    c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

    c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")


    if c.Request.Method == "OPTIONS" {

      c.AbortWithStatus(204)

      return

    }


    c.Next()

  }

}
