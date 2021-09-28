package endpoints

import (
	"fmt"
	"net/http"
	"os"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func DeleteMedia(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	path := utilities.JoinPath(mediaType, fileName)

	_, err := WalkFilePath(path)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = os.RemoveAll(path)
    if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Successfully deleted: %s", fileName),
	})
}
