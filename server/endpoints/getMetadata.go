package endpoints

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"streamr/utilities"

	"github.com/gin-gonic/gin"
)

func GetMediaMetadata(c *gin.Context) {

	mediaType := c.Param("mediaType")
	fileName := c.Param("fileName")

	jsonFile, err := os.Open(fmt.Sprintf("%s/%s/%s/%s", MediaDir, mediaType, fileName, "meta.json"))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	
	var meta utilities.JsonMetadata
	err = json.Unmarshal(byteValue, &meta)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, meta)
}