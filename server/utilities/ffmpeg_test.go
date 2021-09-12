package utilities_test

import (
	"streamr/utilities"
	"testing"

	"gotest.tools/assert"
)

func TestConvertMP4ToHSL(t *testing.T) {
	err := utilities.ConvertMediaToHSL("media/mp4", "in.mp4", "outputlist.m3u8")

	assert.NilError(t, err)
}

func TestConvertHSLToMP4(t *testing.T) {
	err := utilities.ConvertHSLToMedia("media/mp4", "outputlist.m3u8", "out.mp4")

	assert.NilError(t, err)
}

func TestConvertMP3ToHSL(t *testing.T) {
	err := utilities.ConvertMediaToHSL("media/mp3", "in.mp3", "outputlist.m3u8")

	assert.NilError(t, err)
}

func TestConvertHSLToMP3(t *testing.T) {
	err := utilities.ConvertHSLToMedia("media/mp3", "outputlist.m3u8", "out.mp3")

	assert.NilError(t, err)
}