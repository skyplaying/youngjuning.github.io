#!/bin/bash
docker run -tid --name baota -p 80:80 -p 443:443 -p 8888:8888 -p 888:888 -p 20:20 -p 21:21 --privileged=true --restart always -v baota_www:/www -v ~/wwwroot:/www/wwwroot pch18/baota
