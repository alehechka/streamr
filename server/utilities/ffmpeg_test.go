package utilities_test

import (
	"streamr/utilities"
	"testing"

	"gotest.tools/assert"
)

func TestConvertMP4ToHSL(t *testing.T) {
	err := utilities.ConvertMP4ToHSL("./media/mp4", "test.mp4", "outputlist.m3u8")

	assert.NilError(t, err)
}