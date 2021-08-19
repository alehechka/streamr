package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// configure the songs directory name and port
const mediaDir string = "media"
const port string = "8080"

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/upload/:mediaType/:fileName", UploadFile)
	router.GET("/media-finder/:mediaType", getMediaDir)
	router.StaticFS("/media", http.Dir(mediaDir))

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}

func getMediaDir(c *gin.Context)  {
		mediaType := c.Param("mediaType")
		paths, err := GetMediaDir(fmt.Sprintf(`%s\%s`, mediaDir, mediaType))
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

func GetMediaDir(root string) ([]string, error) {
    folders := make([]string, 0)
    err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		subPath := strings.ReplaceAll(path, fmt.Sprintf(`%s\`, root), "")
		pathParts := strings.Split(subPath, `\`)
        if info.IsDir() && path != root && len(pathParts) <= 1 {
            folders = append(folders, pathParts[0])
        }
        return nil
    })
    return folders, err
}

func UploadFile(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")
	file, err := c.FormFile("file")

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println(file.Filename, mediaType, fileName)
}

// TODO: Create media converter
// mp4: ffmpeg -i filename.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls outputlist.m3u8
// mp3: ffmpeg -i BachGavotteShort.mp3 -c:a libmp3lame -b:a 128k -map 0:0 -f segment -segment_time 10 -segment_list outputlist.m3u8 -segment_format mpegts output%03d.ts