# This should be executed after MISP is running, this is just a temporary file to not lose the commands
docker exec misp-docker-misp-core-1 app/Console/cake Admin setSetting Security.allow_cors true
docker exec misp-docker-misp-core-1 app/Console/cake Admin setSetting Security.cors_origins '*'
docker exec misp-docker-misp-core-1 app/Console/cake Admin setSetting Plugin.workflow_enable true
