package utilities

import (
	"fmt"
	"io"
	"io/fs"
	"mime/multipart"
	"os"
	"path/filepath"
)

func SaveFileToPath(file *multipart.FileHeader, filePath string) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		if err := os.Mkdir(filePath, fs.ModeAppend); err != nil {
			return err
		}
	}

	dst, err := os.Create(filepath.Join(filePath, filepath.Base(file.Filename))) // dir is directory where you want to save file.
	if err != nil {
		fmt.Println("create", err)
		return err
	}
	defer dst.Close()
	if _, err = io.Copy(dst, src); err != nil {
		fmt.Println("save", err)
		return err
	}

	return nil
}