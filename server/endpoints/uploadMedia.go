package endpoints

import (
	"net/http"
	"os"
	"path/filepath"
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

	filePath := filepath.Join("app", "media", mediaType, fileName)

	err = utilities.ConvertMediaToHSL(filePath, file.Filename, HSL_OUTPUT_SEED_FILE)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	saveOriginal := c.Query("saveOriginal")
	if saveOriginal == "false" {
		os.Remove(filepath.Join(filePath, file.Filename))
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully uploaded new media.",
		"meta": meta,
	})
}