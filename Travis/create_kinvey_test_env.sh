#!/bin/bash

export KINVEY_USER_2FA_TOKEN=$(docker run --rm gzm55/oathtool --totp -b $KINVEY_USER_2FA_SECRET)
kinvey profile create "testProfile" --email ${KINVEY_USER_EMAIL} --password ${KINVEY_USER_PASSWORD} --2fa ${KINVEY_USER_2FA_TOKEN}

kinvey appenv create ${KINVEY_APP_ENV_NAME} --app ${KINVEY_APP_NAME} ../Travis/test_env_config.json

export KINVEY_KID=$(kinvey appenv show --app ${KINVEY_APP_NAME} --env ${KINVEY_APP_ENV_NAME} | grep "id" | awk '{ print $2}' )
export KINVEY_APPSECRET=$(kinvey appenv show --app ${KINVEY_APP_NAME} --env ${KINVEY_APP_ENV_NAME} | grep "appSecret" | awk '{ print $2}' )
