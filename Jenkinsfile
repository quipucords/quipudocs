def qpc_version = "0.0.47"

node('f28-os') {
    stage('Install') {
        sh "sudo dnf -y install origin-clients nodejs"
        checkout scm
        sh "sudo setenforce 0"
    }
    stage('Build Setup') {
        sh "node -v"
        sh "npm -v"
        sh "sudo npm install -g n"
        sh "sudo n lts"
        sh "node -v"
        sh "npm -v"
        sh "sudo npm install yarn -g"
        sh "yarn --non-interactive"
    }
    stage ('Test Client') {
        sh "yarn test"
    }
    stage('Build Client') {
        sh "yarn build"
    }
}
