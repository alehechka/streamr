package utilities

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/dhowden/tag"
)

func SaveFileToPath(file *multipart.FileHeader, filePath string) (JsonMetadata, error) {
	src, err := file.Open()
	if err != nil {
		return JsonMetadata{}, err
	}
	defer src.Close()

	pathParts := strings.Split(filePath, "/")
	pathBuilder := ""
	for _, part := range pathParts {
		pathBuilder= pathBuilder + part + "/"
		if _, err := os.Stat(pathBuilder); os.IsNotExist(err) {
			if err := os.Mkdir(pathBuilder, fs.ModeAppend); err != nil {
				return JsonMetadata{}, err
			}
		}
	}

	dst, err := os.Create(filepath.Join(filePath, filepath.Base(file.Filename))) // dir is directory where you want to save file.
	if err != nil {
		return JsonMetadata{}, err
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return JsonMetadata{}, err
	}
	
	return ExtractMetaData(file)
}

type JsonMetadata struct {
	FileName string `json:"fileName"`
	Format tag.Format `json:"format"`
	FileType tag.FileType `json:"fileType"`

	Title string `json:"title"`
	Album string `json:"album"`
	Artist string `json:"artist"`
	AlbumArtist string `json:"albumArtist"`
	Composer string `json:"composer"`
	Genre string `json:"genre"`
	Year int `json:"year"`

	Track int `json:"track"`

	Lyrics string `json:"lyrics"`
	Comment string `json:"comment"`
}

func ExtractMetaData(file *multipart.FileHeader) (JsonMetadata, error) {
	src, err := file.Open()
	if err != nil {
		return JsonMetadata{}, err
	}
	
	m, err := tag.ReadFrom(src)
	if err != nil {
		return JsonMetadata{}, err
	}

	track, _ := m.Track()

	meta := JsonMetadata{
		FileName: file.Filename,
		Format: m.Format(),
		FileType: m.FileType(),

		Title: m.Title(),
		Album: m.Album(),
		Artist: m.Album(),
		AlbumArtist: m.AlbumArtist(),
		Composer: m.Composer(),
		Genre: m.Genre(),
		Year: m.Year(),

		Track: track,

		Lyrics: m.Lyrics(),
		Comment: m.Comment(),
	}

	if meta.Artist == meta.Album {
		meta.Artist = fmt.Sprintf("%v", m.Raw()["TPE1"])
	}

	return meta, nil
}

func WriteMetadataToFile(meta JsonMetadata, filePath string) (error) {
	file, err := json.MarshalIndent(meta, "", " ")
	if err != nil {
		return err
	}
 
	return ioutil.WriteFile(filePath, file, 0644)
}

func GetMetaData(mediaType, fileName string) (JsonMetadata, error) {
	var meta JsonMetadata

	jsonFile, err := os.Open(filepath.Join("app", "media", mediaType, fileName, "meta.json"))
	if err != nil {
		return meta, err
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return meta, err
	}
	
	err = json.Unmarshal(byteValue, &meta)
	if err != nil {
		return meta, err
	}

	return meta, nil
}