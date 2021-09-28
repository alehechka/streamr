package endpoints

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadThumbnail(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	_, err := DownloadFile(c, mediaType, fileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"message": "Successfully uploaded image.",
	})
}