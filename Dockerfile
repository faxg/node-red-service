FROM node:10
ENV NPM_CONFIG_LOGLEVEL info
ENV PORT=8080
EXPOSE 8080
VOLUME [ "/app/workspace" ]
CMD ["npm", "run", "start"]
#instead of RUN npm install
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/
WORKDIR /app
COPY bin ./bin
COPY *.js ./
COPY *.json ./
COPY custom-nodes ./custom-nodes
COPY public ./public
COPY routes ./routes
COPY views ./views
COPY workspace ./workspace