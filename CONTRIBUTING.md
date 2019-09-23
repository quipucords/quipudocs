# Contributing
Contributing encompasses repository specific requirements along with the global 
[Quipucords guidelines](https://github.com/quipucords/quipucords/blob/master/CONTRIBUTING.md).

## Branching, Pull Requests, and Releases

### Branches
Branching is an independent process controlled by a combination of Quipucords and Quipudocs
specific requirements.

#### Pull Requests
Pull requests towards master branch require minimal linting and basic Aciidoctor build setup to pass.
Any pull request that fails the basic CI checks should be updated accordingly. To understand what
part of the build has failed does require basic knowledge on how to read CI logs.

### Releases, Tagging
Releases in Quipudocs are focused on tagging. Tagging a Git commit for release is an independent 
process controlled by the overarching Quipucords release process.

## Deploying, or building, compiled documentation
On Quipudocs deploying, or building, compiled documentation, happens at the CI level in an effort
to remove developer error. CI still depends on being informed of when said deployment needs to happen.

To get CI to cycle its deployment, or build, process all that's needed is to merge a pull 
request or push a commit towards master branch on Quipudocs. From there the CI process will pick
up on the updated branch and cycle through its process where a "deployment" commit will appear
stating `chore(build): deploy` within the Git commit history for the related branch.

### Deployment Parameters
To affect build/deployment behavior several CI build parameters have been provided, see the [.travis file](./.travis.yml) 

Build parameters include:
- `AUTO_DEPLOY` - should the deployment automatically deploy on `$BRANCH` update or use the commit message token `[DEPLOY]`.
   - Set `$AUTO_DEPLOY` to `false` in order to use the `[DEPLOY]` token. The token must be appear within the commit 
      message, subject or body doesn't matter. This will typically take place when squashing your commits on pull
      request merge within GitHub.
- `BRANCH` - the branch that CI observes for deployment updates 
- `EMAIL` - the email associated with the deployment commit
- `REPO` - the repository location used by the deployment to commit back towards
- `USER` - the user name associated with the deployment commit

## Testing
To independently test content you'll need to have Node and Yarn installed.

### Linting
On Quipudocs there are 3 facets of linting that happen against 3 sets of files.
- `js` linting
- `json` linting
- `html` linting/hinting

The 3 affected directories are
- `dist` - It is linted for `json`, `js`, and `html`.
- `scripts` - It is linted for both `json` and `js`.
- `docs` - It is linted for `html`.

### Integration Testing
For Quipudocs integration testing typically happens on the CI side after the build output, but
before the deployment push back towards the repository. The integration tests are generic written
in order to avoid constantly updating their baseline snapshots.

#### Run Integration tests standalone
To run the integration tests standalone run
  ```
  $ yarn test:integration
  ```

#### Updating Integration test snapshots
Quipudocs leverages code snapshots to help set baseline integration tests. To update these snapshots, 
from the terminal run
  ```
  $ yarn test:integration-dev
  ```
You'll be asked a list of question, choose to "update snapshots" and the process will continue.
Next, if the snapshots updated you'll need to 
- visually check the updates to confirm the expected output
- and check the snapshots in so the next developer has a testing baseline.

## Workflow
### Use an Asciidoctor workflow with Docker for GUI documentation
After setting up the repository
1. Make sure Docker is running
1. At a terminal instance type `$ yarn start`
1. A basic browser window should attempt to open showing you a basic file list. If the browser
   doesn't open you can manually open, in a browser, `./.asciidoctor/index.html`. From there you
   can select the different Asciidoctor render files to observe while you edit them live. 

### Asciidoctor workflow with Docker for GitHub pages
Similar to the GUI documentation except guided toward GitHub pages. After setting up the repository
1. Make sure Docker is running
1. At a terminal instance type `$ yarn start:gh`
1. A basic browser window should attempt to open showing you a basic file list. If the browser
   doesn't open you can manually open, in a browser, `./.asciidoctor/index.html`. From there you
   can select the different Asciidoctor render files to observe while you edit them live. 
