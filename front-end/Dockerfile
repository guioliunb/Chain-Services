#Using smaller image as possible (basic image)
#Builder is the name of container
FROM node:10.15.3-alpine AS builder

#Absolute path
WORKDIR /app

#Copying packages from /app
COPY ./package.json ./
RUN npm install

#Copy all the files
COPY . .
RUN npm run builder

FROM nginx
#Default port - We can need this using elastic search
EXPOSE 3000

#Disk folder inside a container is done
#Now overides nginx config to project config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["service nginx start"]