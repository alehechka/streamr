package endpoints

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

const MediaDir string = "media"

func GetMediaDir(c *gin.Context) {
	mediaType := c.Param("mediaType")
	paths, err := getMediaDir(fmt.Sprintf(`%s\%s`, MediaDir, mediaType))
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

func getMediaDir(root string) ([]string, error) {
	folders := make([]string, 0)
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		subPath := strings.ReplaceAll(path, fmt.Sprintf(`%s\`, root), "")
		pathParts := strings.Split(subPath, `\`)
		if info.IsDir() && path != root && len(pathParts) <= 1 {
			folders = append(folders, pathParts[0])
		}
		return nil
	})
	return folders, err
}