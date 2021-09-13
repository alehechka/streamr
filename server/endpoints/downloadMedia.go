package endpoints

import (
	"net/http"
	"os"
	"path/filepath"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func DownloadMedia(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	meta, err := utilities.GetMetaData(mediaType, fileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	filePath := filepath.Join("app", "media", mediaType, fileName)
	err = utilities.ConvertHSLToMedia(filePath, HSL_OUTPUT_SEED_FILE, meta.FileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	WriteFileToResponse(c, mediaType, fileName, meta.FileName)
	
	os.Remove(filepath.Join(filePath, meta.FileName))
}

