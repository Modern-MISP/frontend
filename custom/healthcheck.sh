#!/bin/bash
curl -f "http://localhost" && grep "'Workflow_enable' => true" "/var/www/MISP/app/Config/config.php"
