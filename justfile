rebuild-images: prune build-node build-ui
prune: 
  @echo "y" | docker system prune

build-node:
  @echo "building server image"
  @cd ./server docker build -t resume-builder-backend .

build-ui: 
  @echo "building ui image"
  @cd ./ui && docker build -t resume-builder .

restart-colima:
  colima stop
  colima start --cpu 4 --memory 8 --disk 100