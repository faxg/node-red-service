# Node-Red Service
Low-code, event-driven microservice using Node-Red (http://nodered.org)


## Overview
Node-Red is an open source, low-code platform for building event-driven apps. 
Originally focused on the IoT space, it can be used for many different use cases. It is extensible with custom nodes and especially great for fast  prototyping of microservices.


This service is an opinionated custom-wrapped version of node-red, specifically targeted to run inside Kubernetes clusters.

Some design choices:
- uses node-red "projects" to pull flows from an external git repository
- custom nodes can be dynamically installed


## Build
 - As an NodeJS / express app:
 ```bash
npm install
npm run start
open http://0.0.0.0:8080/
 ```
 - Local build and run using Docker 
 ```bash
docker build . -t node-red-service
docker run -p 8080:8080 node-red-service
open http://0.0.0.0:8080/
```

## Deploy on Kubernetes

## Deploy on Openshift 3.11
