# This should be executed after MISP is running, this is just a temporary file to not lose the commands
docker compose exec misp-core app/Console/cake Admin setSetting Security.allow_cors true
docker compose exec misp-core app/Console/cake Admin setSetting Security.cors_origins '*'
docker compose exec misp-core app/Console/cake Admin setSetting Plugin.Workflow_enable true
