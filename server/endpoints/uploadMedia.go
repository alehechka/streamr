package endpoints

import (
	"fmt"
	"net/http"
	"os"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func UploadMedia(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	file, meta, err := DownloadFile(c, mediaType, fileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	filePath := fmt.Sprintf("./%s/%s/%s", MediaDir, mediaType, fileName)

	err = utilities.ConvertMediaToHSL(filePath, file.Filename, "outputlist.m3u8")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	saveOriginal := c.Query("saveOriginal")
	if saveOriginal == "false" {
		os.Remove(fmt.Sprintf("%s/%s", filePath, file.Filename))
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully uploaded new media.",
		"meta": meta,
	})
}