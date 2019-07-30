#!/usr/bin/env bash
#
#
# Create a static index.html file to open in a browser
#
createServeIndex()
{
  local OUTPUT_DIR=$1
  local INDEX_FILE=$2

  mkdir -p $OUTPUT_DIR

  echo "<html>${INDEX_FILE}</html>" > "${OUTPUT_DIR}/index.html"

  open ${OUTPUT_DIR}/index.html
}
#
#
# Run dev setup, used for local docs development
#
dev()
{
  local CONTAINER="cdcabrera/asciidoctor-build:0.0.1"
  local NAME="asciidoctor-docs"
  local INPUT_DIR="$(pwd)/src"
  local OUTPUT_DIR="$(pwd)/.asciidoctor"
  local SRC_FILES=$1
  local SRC_LIST=()
  local OUTPUT_FILENAMES=$2
  local OUTPUT_FILENAME_LIST=()
  local OUTPUT_OPTION=""
  local SOURCE_OPTION=""
  local INDEX_FILE=""
  local EXEC_CMD=""

  if [ -z "$SRC_FILES" ]; then
    printf "\n${RED}Source Asciidoc file missing.${NOCOLOR}\n"
    exit 1
  fi

  if [ -z "$OUTPUT_FILENAMES" ]; then
    printf "\n${RED}Output filenames for Asciidoc missing.${NOCOLOR}\n"
    exit 1
  fi

  # clean up output directory
  rm -rf $OUTPUT_DIR/*
  docker stop -t 0 $NAME >/dev/null

  # setup docker cli tool
  if [ -z "$(docker images -q $CONTAINER)" ]; then
    echo "Setting up Docs development Docker container"
    docker pull $CONTAINER
  fi

  # generate source list/array
  for SRC_FILE in $SRC_FILES; do
    local TEMP_FILE="../data/${SRC_FILE/.\/src\//}"
    TEMP_FILE="${TEMP_FILE/src\//}"

    SRC_LIST+=("$TEMP_FILE")
  done

  # generate output list/array and output names for index.html
  for OUTPUT_FILENAME in $OUTPUT_FILENAMES; do
    OUTPUT_FILENAME_LIST+=("-o ../output/${OUTPUT_FILENAME}")

    INDEX_FILE="${INDEX_FILE}<a href=\"./${OUTPUT_FILENAME}\">${OUTPUT_FILENAME}</a><br/>"
  done

  if [ "${#SRC_LIST[@]}" -ne "${#OUTPUT_FILENAME_LIST[@]}" ]; then
    printf "\n${RED}Number of Asciidoc sources doesn't match the length of output file names.${NOCOLOR}\n"
    exit 1
  fi

  # generate exec string with both the source list/array and output list/array
  for i in "${!SRC_LIST[@]}"; do
    if [ ! -z "$EXEC_CMD" ]; then
      EXEC_CMD="${EXEC_CMD} &&"
    fi

    EXEC_CMD="${EXEC_CMD} asciidoctor -t -d book -a toc=left -v ${OUTPUT_FILENAME_LIST[$i]} ${SRC_LIST[$i]}"
  done

  # run exec string against docker cli tool
  if [ -z "$(docker ps | grep $CONTAINER)" ]; then
    echo "Starting Docs development..."

    createServeIndex $OUTPUT_DIR "${INDEX_FILE}"
    docker run -it --rm -v $INPUT_DIR:/data -v $OUTPUT_DIR:/output --name $NAME $CONTAINER -w -e "$EXEC_CMD"
  fi
}
#
#
# main()
#
{
  RED="\e[31m"
  GREEN="\e[32m"
  NOCOLOR="\e[39m"
  SRC=""
  OUTPUT=""

  while getopts s:o: option;
    do
      case $option in
        s ) SRC="${SRC} $OPTARG";;
        o ) OUTPUT="${OUTPUT} $OPTARG";;
      esac
  done

  if [ -z "$(docker -v)" ]; then
    printf "\n${RED}Docker missing, confirm installation, and running.${NOCOLOR}\n"
    exit 1
  fi

  dev "$SRC" "$OUTPUT"
}
