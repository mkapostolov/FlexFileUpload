#!/bin/bash

# Whatch for Job status changes
deploymentStatus='initiated'
while [ "$deploymentStatus" != "COMPLETED" ]
	do
	deploymentStatus=$(kinvey flex status --service ${KINVEY_SERVICE_ID} --env ${KINVEY_SERVICE_ENV_NAME}| grep "deploymentStatus" | awk '{ print $2}' )

  echo "deployment status   -> target-COMPLETED : current-${deploymentStatus}"

  if [ "$deploymentStatus" == "Failed" ]
     then
      echo "=> Deploy failed"
      exit 1
  fi

	sleep 5
done

# Whatch for Runtime vesrion changes
statusVersion='1'
while [ "${PACKAGE_VERSION}" != "${statusVersion}" ]
	do
	 statusVersion=$(kinvey flex status --service ${KINVEY_SERVICE_ID} --env ${KINVEY_SERVICE_ENV_NAME}| grep "version" | awk '{ print $2}' )
	echo "package version   -> target v${PACKAGE_VERSION} : current v${statusVersion}"
	sleep 5
done

# Whatch for Rintime status changes
runtimeStatus="null"
while [ "$runtimeStatus" != "ONLINE" ]
	do
	 runtimeStatus=$(kinvey flex status --service ${KINVEY_SERVICE_ID} --env ${KINVEY_SERVICE_ENV_NAME}| grep "status" | awk '{ print $2}' )

	echo "runtime status    -> target-ONLINE : current-${runtimeStatus}"
	sleep 5
done

echo "=> Service is now online"
exit 0
