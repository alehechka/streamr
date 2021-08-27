FROM alpine:3.7

ADD server server
ADD client client
# ADD ffmpeg ffmpeg

ENV PORT=8080

EXPOSE 8080
CMD ["/streamr"]