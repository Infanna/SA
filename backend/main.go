package main


import (

  "github.com/Infanna/sa-64-example/controller"

  "github.com/Infanna/sa-64-example/entity"

  "github.com/gin-gonic/gin"


)


func main() {

  entity.SetupDatabase()

  r := gin.Default()
  r.Use(CORSMiddleware())

  // Insurance

  r.GET("/insrs", controller.ListInsurance)

  r.POST("/insr", controller.CreateInsurance)
  

  // Job

  r.GET("/jobs", controller.ListJob)

  r.POST("/job", controller.CreateJob)


  // Patient

  r.GET("/patients", controller.ListPatient)

  r.POST("/patient", controller.CreatePatient)


  // Sex

  r.GET("/sexs", controller.ListSex)

  r.POST("/sex", controller.CreateSex)
  

  // user

  r.GET("/users", controller.ListUser)

  r.GET("/users/:id", controller.GetUser)

  r.POST("/user", controller.CreateUser)

  
  // role

  r.GET("/roles", controller.ListRole)

  r.POST("/role", controller.CreateRole)



  // watch pats

  r.GET("/wpats", controller.ListWatchPatient)

  r.POST("/wpat", controller.CreateWatchPatient)


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
