package endpoints

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/facebookgo/symwalk"
	"github.com/gin-gonic/gin"
)

const MediaDir string = "app\\media"

func GetMediaDir(c *gin.Context) {
	mediaType := c.Param("mediaType")
	paths, err := WalkFilePath(fmt.Sprintf(`%s\%s`, MediaDir, mediaType))
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
	err := symwalk.Walk(root, func(path string, info os.FileInfo, err error) error {
		if info == nil {
			return errors.New("root folder not found")
		}
		subPath := strings.ReplaceAll(path, fmt.Sprintf(`%s\`, root), "")
		pathParts := strings.Split(subPath, `\`)
		if info.IsDir() && path != root && len(pathParts) <= 1 {
			folders = append(folders, pathParts[0])
		}
		return nil
	})
	return folders, err
}