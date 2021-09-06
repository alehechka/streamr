package endpoints

import (
	"mime/multipart"
	"path/filepath"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

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