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

	_, meta, err := DownloadFileWithMetadata(c, mediaType, fileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	filePath := utilities.JoinPath(mediaType, fileName)

	err = utilities.ConvertMediaToHSL(filePath, meta.FileName, HSL_OUTPUT_SEED_FILE)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	saveOriginal := c.Query("saveOriginal")
	if saveOriginal == "false" {
		defer os.Remove(filepath.Join(filePath, meta.FileName))
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully uploaded new media.",
		"meta": meta,
	})
}