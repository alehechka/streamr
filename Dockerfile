FROM alpine:3.7

ADD build/server server
ADD build/client client
# ADD ffmpeg ffmpeg

ENV PORT=8080

EXPOSE 8080
CMD ["/server"]