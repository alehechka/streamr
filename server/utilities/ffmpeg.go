package utilities

import (
	"bytes"
	"fmt"
	"os/exec"
)

func ConvertMP4ToHSL(filePath, fileName, outputName string) error {

	cmd := exec.Command(
		"ffmpeg",
		"-i", fmt.Sprintf("%s/%s", filePath, fileName),
		"-codec:", "copy",
		"-start_number", "0",
		"-hls_time", "10",
		"-hls_list_size", "0",
		"-f", "hls",
		fmt.Sprintf("%s/%s", filePath, outputName),
	)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		return err
	}
	fmt.Println("Result: " + out.String())

	return nil
}