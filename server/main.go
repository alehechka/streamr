package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"streamr/endpoints"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func ApiRouterGroup(router *gin.RouterGroup) {
	router.POST("/upload/:mediaType/:fileName", endpoints.UploadMedia)

	router.DELETE("/media/:mediaType/:fileName", endpoints.DeleteMedia)

	router.GET("/media-finder/:mediaType", endpoints.GetMediaDir)
	router.GET("/metadata/:mediaType/:fileName", endpoints.GetMediaMetadata)

	router.StaticFS("/media", http.Dir(endpoints.MediaDir))
}

func ClientRouterGroup(router *gin.Engine) {
	router.GET("/media/*path", func(c *gin.Context) {
		c.Request.URL.Path = "/"
		router.HandleContext(c)
	})
	router.Use(static.Serve("/", static.LocalFile("./app/client", true)))
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	// Serve frontend static files
	ClientRouterGroup(router)

	// Serve API endpoints
	api := router.Group("/api")
	ApiRouterGroup(api)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	paths, err := endpoints.WalkFilePath(".")
	fmt.Println(paths, err)

	err = router.Run(":" + PORT)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}