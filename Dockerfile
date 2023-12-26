FROM node:alpine
WORKDIR /ebay-retail
COPY . .
RUN npm install
COPY .env .env
RUN tsc
EXPOSE 5000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "sh", "./entrypoint.sh" ]