package utilities

import "path"

func JoinPath(parts ...string) string {
	return path.Join("app", "media", path.Join(parts...))
}