package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// configure the songs directory name and port
const mediaDir string = "./media"
const port string = "8080"

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/", getMedia)
	router.StaticFS("/media", http.Dir(mediaDir))

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}

func getMedia(c *gin.Context)  {

		paths, err := FilePathWalkDir(mediaDir)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"paths": paths,
		})

}

func FilePathWalkDir(root string) ([]string, error) {
    var files []string
    err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
        if !info.IsDir() && strings.HasSuffix(path, ".m3u8") {
            files = append(files, path)
        }
        return nil
    })
    return files, err
}