package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/env"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
	"github.com/makersacademy/go-react-acebook-template/api/src/routes"
)

func main() {
	// Load environment variables	
	env.LoadEnv()

	// Setup the application
	app := setupApp()

	// Open the database connection
	models.OpenDatabaseConnection()

	// Auto migrate the models
	models.AutoMigrateModels()

	// Start the server
	app.Run(":8082")
}

func setupApp() *gin.Engine {
	app := gin.Default()
	setupCORS(app)
	
	app.Static("/uploads", "./uploads") // used to serve the profile pictures
	
	routes.SetupRoutes(app)
	return app
}

func setupCORS(app *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}

	app.Use(cors.New(config))
}
