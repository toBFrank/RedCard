FROM node:18
RUN apt-get update && \
    apt-get install -y sudo vim curl ca-certificates 
#COPY node-sudo /etc/sudoers.d    
EXPOSE 3000
USER node
WORKDIR /home/node/

COPY package.json /home/node
RUN npm install 

ENV PATH=/home/node/node_modules/.bin:$PATH
#ENV VITE_API_HOST=localhost:5000

WORKDIR /home/node/work

#CMD npm install --force
CMD ["/usr/local/bin/npm","run", "dev", "--", "--host"]
