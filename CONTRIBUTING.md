# Contributing
Contributing encompasses repository specific requirements along with the global 
[Quipucords guidelines](https://github.com/quipucords/quipucords/blob/master/CONTRIBUTING.md).

## Branching, Pull Requests, and Releases

### Branches

#### Branching and Pull Request Workflow

## Tagging a Release
Tagging a Git commit for release is an independent process controlled by the overarching 
Quipucords release process.

## Build, or deploying compiled documentation
On Quipudocs building, or deploying compiled documentation, happens at the CI level in an effort
to remove developer error. However, CI still depends on being informed of when said deployment 
needs to happen.

To get CI to cycle its deployment, or build, process all that's needed is to merge a pull 
request or push a commit towards master branch. From there the CI process will pick up on the 
updated branch and cycle   

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
For Quipudocs integration testing typically happens on the CI side after the build output. 
The integration tests are generic in order to avoid constantly updating their baseline.

#### Run Integration tests standalone
To run the integration tests standalone run
  ```
  $ yarn test:integration
  ```

#### Updating Integration test snapshots
To update snapshots from the terminal run
  ```
  $ yarn test:integration-dev
  ```
You'll be asked a list of question, choose to "update snapshots" and the process will continue.
Next, if the snapshots updated you'll need to 
- visually check the updates to confirm the expected output
- and check the snapshots in so the next developer has a testing baseline.

## Getting Asciidoctor to run in your local environment.
### Use an Asciidoctor workflow with Docker
After setting up the repository...
1. Make sure Docker is running
1. ...

