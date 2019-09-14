#!/bin/bash
#
#
# main()
#
{
  GREEN="\e[32m"
  YELLOW="\e[33m"
  NOCOLOR="\e[39m"

  if [[ $REPO != *"$TRAVIS_REPO_SLUG"* ]]]; then
    echo -e "${YELLOW}Exiting early, not master repository${NOCOLOR}"
    exit 0;
  fi

  if [[ "${TRAVIS_BRANCH}" = "master" ]] && [[ $TRAVIS_BUILD_STAGE_NAME == *"Build"* ]]; then
    printf "${YELLOW}PUSHING Quipudocs build...${NOCOLOR}\n"

    git config --global user.name "travis@travis-ci.org"
    git config --global user.email "CI Build"
    git remote add ssh-origin ${REPO}
    git checkout -b test

    git add -f ./dist/*
    git add -f ./docs/*
    git commit -m "chore(build): deploy"
    git push ssh-origin test --quiet

    printf "${GREEN}COMPLETED Quipudocs build${NOCOLOR}\n"
    exit 0;
  fi

  echo -e "${YELLOW}Exiting, not master branch or build stage${NOCOLOR}"
  exit 0;
}
