FROM golang

EXPOSE 8080

RUN go get github.com/lib/pq

ENTRYPOINT ["/go/src/server/container-run.sh"]
