package endpoints

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadFile(c *gin.Context) {
	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")
	file, err := c.FormFile("file")

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println(file.Filename, mediaType, fileName)
}