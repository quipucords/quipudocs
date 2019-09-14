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
# Github pages output
#
ghPages()
{
  parseAsciidoc ./src/community/titles/install/qpc ./docs/install.html "-a toc=left"
  parseAsciidoc ./src/community/titles/user/qpc ./docs/user.html "-a toc=left"
}
#
#
# main()
#
{
  ghPages
}
