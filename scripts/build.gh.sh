#!/usr/bin/env bash
#
#
# Parse asciidoctor
#
parseAsciidoc()
{
  local DIR=$1
  local OUTPUT=$2
  local TOC="${3}"
  local ADOC="${4:-master.adoc}"

  asciidoctor -v --failure-level error -S safe -d book -B $DIR -o $OUTPUT "$DIR/$ADOC" -a toc="$TOC"
}
#
#
# Github pages output
#
ghPages()
{
  parseAsciidoc ./src/community/titles/gh_pages ./docs/index.html
  parseAsciidoc ./src/community/titles/install/qpc ./docs/install.html left
  parseAsciidoc ./src/community/titles/user/qpc ./docs/user.html left
}
#
#
# main()
#
{
  ghPages
}
