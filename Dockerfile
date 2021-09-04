FROM alpine:3.7

ADD build/server server
ADD build/client client

RUN apk update
RUN apk upgrade
RUN apk add ffmpeg

ENV PORT=8080

EXPOSE 8080
CMD ["/server"]