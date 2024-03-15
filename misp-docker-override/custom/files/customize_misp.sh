#!/bin/bash
sudo -u www-data /var/www/MISP/app/Console/cake Admin setSetting Security.allow_cors true
sudo -u www-data /var/www/MISP/app/Console/cake Admin setSetting Security.cors_origins '*'
sudo -u www-data /var/www/MISP/app/Console/cake Admin setSetting Plugin.Workflow_enable true
