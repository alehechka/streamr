package utilities

import (
	"fmt"
	"io"
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

	// cmd.Stdout = os.Stdout // uncomment to view output
	// cmd.Stderr = os.Stderr // uncomment to view errors

	return cmd.Run()
}

func ConvertHSLToMedia(filePath, fileName, outputName string) error {

	cmd := exec.Command(
		"ffmpeg",
		"-i", filepath.Join(filePath, fileName),
		"-acodec", "copy",
		"-vcodec", "copy",
		filepath.Join(filePath, outputName),
	)

	stdin, err := cmd.StdinPipe()
    if err != nil {
        return err
    }
    defer stdin.Close()

	// cmd.Stdout = os.Stdout // uncomment to view output
	// cmd.Stderr = os.Stderr // uncomment to view errors

	if err := cmd.Start(); err != nil {
		fmt.Println("Error occured:", err)
	}

	io.WriteString(stdin, "y\n")
	cmd.Wait()

	return nil
}