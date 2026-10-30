pipeline {
    agent { label 'docker' }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        // TODO: DOCKERHUB_USER ko apne Docker Hub username se badlo
        IMAGE = 'hgharshitgarg7878/expense-tracker'
        TAG   = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Lint') {
            steps {
                // Lint fail hone par build UNSTABLE hoga, fail nahi (shuruat mein)
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    sh '''
                      docker run --rm \
                        -u "$(id -u):$(id -g)" -e HOME=/tmp \
                        -e DATABASE_URL="postgresql://build:build@localhost:5432/build" \
                        -v "$PWD":/app -w /app node:20-alpine \
                        sh -c "npm ci --ignore-scripts && npx prisma generate && npm run lint"
                    '''
                }
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS')]) {
                    sh '''
                      echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                      docker push $IMAGE:$TAG
                      docker push $IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'expense-env', variable: 'ENV_FILE')]) {
                    sh '''
                      cp "$ENV_FILE" .env
                      docker compose pull app
                      docker compose up -d --no-build --remove-orphans
                      rm -f .env
                    '''
                }
            }
        }

        stage('Verify') {
            steps {
                sh '''
                  for i in $(seq 1 12); do
                    s=$(docker inspect -f '{{.State.Health.Status}}' expense-app)
                    echo "health: $s"
                    [ "$s" = "healthy" ] && exit 0
                    sleep 5
                  done
                  docker logs --tail 50 expense-app
                  exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            sh 'docker image prune -f || true'
        }
    }
}
