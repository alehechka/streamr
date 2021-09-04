FROM alpine:3.7

ADD build/server server
ADD build/client client

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

ENV PORT=8080

EXPOSE 8080
CMD ["/server"]