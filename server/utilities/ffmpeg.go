package utilities

import (
	"bytes"
	"os/exec"
	"path/filepath"
)

func ConvertMediaToHSL(filePath, fileName, outputName string) error {

	cmd := exec.Command(
		"ffmpeg",
		"-i", filepath.Join(filePath, fileName),
		"-codec:", "copy",
		"-start_number", "0",
		"-hls_time", "10",
		"-hls_list_size", "0",
		"-f", "hls",
		filepath.Join(filePath, outputName),
	)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		// fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		return err
	}
	// fmt.Println("Result: " + out.String())

	return nil
}

func ConvertHSLToMedia(filePath, fileName, outputName string) error {

	cmd := exec.Command(
		"ffmpeg",
		"-i", filepath.Join(filePath, fileName),
		"-acodec", "copy",
		"-vcodec", "copy",
		filepath.Join(filePath, outputName),
	)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		// fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		return err
	}
	// fmt.Println("Result: " + out.String())

	return nil
}