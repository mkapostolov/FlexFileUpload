#!/bin/bash

export PACKAGE_VERSION=$(node -p "require('./package.json').version")
kinvey flex deploy --service ${KINVEY_SERVICE_ID} --env ${KINVEY_SERVICE_ENV_NAME}
