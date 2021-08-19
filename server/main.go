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

	router.POST("/upload/:mediaType/:fileName", endpoints.UploadFile)
	router.GET("/media-finder/:mediaType", endpoints.GetMediaDir)
	router.StaticFS("/media", http.Dir(endpoints.MediaDir))

	err := router.Run(":" + port)
	if err != nil {
		log.Fatal("Unable to start server")
	}
}





// TODO: Create media converter
// mp4: ffmpeg -i filename.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls outputlist.m3u8
// mp3: ffmpeg -i BachGavotteShort.mp3 -c:a libmp3lame -b:a 128k -map 0:0 -f segment -segment_time 10 -segment_list outputlist.m3u8 -segment_format mpegts output%03d.ts