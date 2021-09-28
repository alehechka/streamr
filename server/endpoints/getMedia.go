package endpoints

import (
	"errors"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func GetMediaDir(c *gin.Context) {
	mediaType := c.Param("mediaType")
	path := utilities.JoinPath(mediaType)
	log.Println(path)
	paths, err := WalkFilePath(path)
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

func WalkFilePath(root string) ([]string, error) {
	folders := make([]string, 0)
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if info == nil {
			return errors.New("root folder not found")
		}
		if info.IsDir() && path != root {
			folders = append(folders, info.Name())
		}
		return nil
	})
	return folders, err
}