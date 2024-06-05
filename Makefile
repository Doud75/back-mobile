CONTAINER_PATH:=/var/www
DOCKER_COMPOSE:=docker compose
UP:=up -d --build
DOWN:=stop
DB_NAME:=postgre_vroum
EXEC:=docker exec
CACHE:=cache:clear
OS:=mac

start:
ifeq (${OS}, mac)
	${DOCKER_COMPOSE} ${UP}
else ifeq (${OS}, lin)
	${DOCKER_COMPOSE} ${UP}
endif

stop:
ifeq (${OS}, mac)
	${DOCKER_COMPOSE} ${DOWN}
else ifeq (${OS}, lin)
	${DOCKER_COMPOSE} ${DOWN}
endif

prune:
	docker volume prune

db: start
	${EXEC} -ti ${DB_NAME} psql -U user -d VROUM -w

insert-data: truncate
	${EXEC} -i ${DB_NAME} psql -U user -d VROUM < database/dump.sql
