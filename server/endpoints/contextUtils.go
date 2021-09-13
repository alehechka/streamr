package endpoints

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

const HSL_OUTPUT_SEED_FILE = "outputlist.m3u8"

func DownloadFile(c *gin.Context, mediaType, fileName string) (*multipart.FileHeader, utilities.JsonMetadata, error) {
	file, err := c.FormFile("file")
	if err != nil {
		return file, utilities.JsonMetadata{}, err
	}

	meta, err := utilities.SaveFileToPath(file, filepath.Join("app", "media", mediaType, fileName))
	if err != nil {
		return file, meta, err
	}
	
	err = utilities.WriteMetadataToFile(meta, filepath.Join("app", "media", mediaType, fileName, "meta.json"))

	return file, meta, err
}

func WriteFileToResponse(c *gin.Context, mediaType, folderPath, fileName string) {

	file, err := os.Open(filepath.Join("app", "media", mediaType, folderPath, fileName))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	defer file.Close()

	fi, err := file.Stat()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	b := make([]byte, fi.Size())
	if _, err := file.Read(b); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fi.Name()))
	c.Header("Content-Length", strconv.Itoa(int(fi.Size())))
	c.Data(http.StatusOK, "application/octet-stream", b)
}