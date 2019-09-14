#!/usr/bin/env bash
#
#
# Parse asciidoctor
#
parseAsciidoc()
{
  local DIR=$1
  local OUTPUT=$2
  local OPTS=$3
  local ADOC="${4:-master.adoc}"

  asciidoctor -v --failure-level error -S safe -d book -B $DIR -o $OUTPUT "$DIR/$ADOC" $OPTS
}
#
#
# Install output
#
install()
{
  parseAsciidoc ./src/community/titles/install/discovery ./dist/install/index-brand.html
  parseAsciidoc ./src/community/titles/install/qpc ./dist/install/index.html
}
#
#
# User output
#
user()
{
  parseAsciidoc ./src/community/titles/user/discovery ./dist/user/index-brand.html
  parseAsciidoc ./src/community/titles/user/qpc ./dist/user/index.html
}
#
#
# main()
#
{
  install
  user
}
