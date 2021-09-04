package endpoints

import (
	"fmt"
	"mime/multipart"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func DownloadFile(c *gin.Context, mediaType, fileName string) (*multipart.FileHeader, utilities.JsonMetadata, error) {
	file, err := c.FormFile("file")
	if err != nil {
		return file, utilities.JsonMetadata{}, err
	}

	meta, err := utilities.SaveFileToPath(file, fmt.Sprintf("%s/%s/%s", MediaDir, mediaType, fileName))
	if err != nil {
		return file, meta, err
	}
	
	err = utilities.WriteMetadataToFile(meta, fmt.Sprintf("%s/%s/%s/%s", MediaDir, mediaType, fileName, "meta.json"))

	return file, meta, err
}