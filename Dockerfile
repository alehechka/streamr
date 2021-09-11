FROM alpine:3.7

ADD build/streamr app/server
ADD build/client app/client

RUN apk add ffmpeg

ENV PORT=8080

EXPOSE 8080
CMD ["/app/server"]