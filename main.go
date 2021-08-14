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

// TODO: Create media converter
// mp4: ffmpeg -i filename.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls outputlist.m3u8
// mp3: ffmpeg -i BachGavotteShort.mp3 -c:a libmp3lame -b:a 128k -map 0:0 -f segment -segment_time 10 -segment_list outputlist.m3u8 -segment_format mpegts output%03d.ts