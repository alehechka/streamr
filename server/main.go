package main

import (
	"log"
	"net/http"
	"streamr/endpoints"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// configure the songs directory name and port

const port string = "8080"

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/upload/:mediaType/:fileName", endpoints.UploadMedia)

	router.GET("/media-finder/:mediaType", endpoints.GetMediaDir)
	router.GET("/metadata/:mediaType/:fileName", endpoints.GetMediaMetadata)

	router.StaticFS("/media", http.Dir(endpoints.MediaDir))

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}