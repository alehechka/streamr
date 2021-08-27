package main

import (
	"log"
	"net/http"
	"streamr/endpoints"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

// configure the songs directory name and port

const port string = "8080"

func ApiRouterGroup(router *gin.RouterGroup) {
	router.POST("/upload/:mediaType/:fileName", endpoints.UploadMedia)

	router.DELETE("/media/:mediaType/:fileName", endpoints.DeleteMedia)

	router.GET("/media-finder/:mediaType", endpoints.GetMediaDir)
	router.GET("/metadata/:mediaType/:fileName", endpoints.GetMediaMetadata)

	router.StaticFS("/media", http.Dir(endpoints.MediaDir))
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	// Serve frontend static files
	router.Use(static.Serve("/client", static.LocalFile("./client", true)))

	// Serve API endpoints
	api := router.Group("/api")
	ApiRouterGroup(api)

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}