setup: restart-colima build-node build-ui

rebuild-images: prune build-node build-ui
prune: 
  @echo "y" | docker system prune

install-ui:
  @cd ./ui && npm i

install-node:
  @cd ./server && npm i

build-node:
  @echo "building server image"
  @cd ./server && docker build -t resume-builder-backend .

build-ui: 
  @echo "building ui image"
  @cd ./ui && docker build -t resume-builder .

restart-colima:
  colima stop
  colima start --cpu 4 --memory 8 --disk 100

up: 
  docker-compose up

backend:
  docker-compose up db server

db:
  docker-compose up db