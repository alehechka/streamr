package endpoints

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/facebookgo/symwalk"
	"github.com/gin-gonic/gin"
)

func GetMediaDir(c *gin.Context) {
	mediaType := c.Param("mediaType")
	paths, err := WalkFilePath(filepath.Join("app", "media", mediaType))
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
			fmt.Println(root, path, info)
			return errors.New("root folder not found")
		}
		fmt.Println(root, info.Name())
		if info.IsDir() && path != root {
			folders = append(folders, info.Name())
		}
		return nil
	})
	return folders, err
}