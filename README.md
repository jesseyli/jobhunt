To start DB and server:
```
docker-compose up
``` 

To reload changes to server:
```
docker-compose restart
```

To use psql after initializing postgres:
```
docker run -it --rm --link jobhunt_postgres_1:postgres  --net jobhunt_default postgres psql -h postgres -U postgres
```
