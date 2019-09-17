#!/usr/bin/env bash
#
#
# Parse asciidoctor
#
parseAsciidoc()
{
  local DIR=$1
  local OUTPUT=$2
  local ADOC="${3:-master.adoc}"

  asciidoctor -v --failure-level error -S safe -d book -B $DIR -o $OUTPUT "$DIR/$ADOC" -a toc=left
}
#
#
# Github pages output
#
ghPages()
{
  parseAsciidoc ./src/community/titles/install/qpc ./docs/install.html
  parseAsciidoc ./src/community/titles/user/qpc ./docs/user.html
}
#
#
# main()
#
{
  ghPages
}
