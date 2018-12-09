FROM postgres:11.1
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB some-postgres
COPY create_script.sql /docker-entrypoint-initdb.d/
COPY insert_script.sql /docker-entrypoint-initdb.d/
