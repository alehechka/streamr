package endpoints

import (
	"net/http"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func GetMediaMetadata(c *gin.Context) {

	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	meta, err := utilities.GetMetaData(mediaType, fileName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, meta)
}