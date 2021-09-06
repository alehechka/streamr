# streamr

Locally hosted web application for media streaming.

### Docker

Commits to `main` will use GitHub Actions to run an automatic build and deployment process. This build compiles the Docker image to both an amd64 and arm/v7 (for RasbianOS) compiled image. Either can be pulled as follows:

```
amd64
docker pull ghcr.io/alehechka/streamr:latest

arm/v7
docker pull ghcr.io/alehechka/streamr:rasbian
```

To run the Docker image, it is required to mount a volume to the container to be able to retain any media upload via the upload process on the frontend. This can done when starting the container as follows:

```
amd64
docker run -d --rm -p 8080:8080 -v path/to/media:/app/media ghcr.io/alehechka/streamr:latest

arm/v7
docker run -d --rm -p 8080:8080 -v ~/path/to/media:/app/media ghcr.io/alehechka/streamr:rasbian
```

---

Backend: Written in GoLang with [gin](https://github.com/gin-gonic/gin) and [ffmpeg](https://www.ffmpeg.org/) for media file conversion.

Frontend: Written in TypeScript with React and [styled-components](https://styled-components.com/) for CSS.

### Local development

The frontend and backend must be run concurrently while in development.

> For local development or build, it is necessary to download (ffmpeg)[https://www.ffmpeg.org/] and add the path to the `bin` file inside to your OS's environment PATH.

#### Frontend

```
cd client

yarn install

yarn start
```

> While developing the frontend, the app will automatically proxy [axios](https://www.npmjs.com/package/axios) requests to the backend running at: http://localhost:8080

#### Backend

```
cd server

yarn get

yarn start
```

> Backend uses [gin](https://github.com/codegangsta/gin) to reload files on save. Globally install with:
>
> ```
> go get github.com/codegangsta/gin
> ```

### Local build

In a more production ready standpoint, the React app is built and added to the folder structure of the GoLang server and hosted as static files via the http server. This can be automated by running the following at the root of the repository:

```
yarn local:build

yarn local:run
```
