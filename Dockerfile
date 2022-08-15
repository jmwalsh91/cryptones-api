FROM node:14

#DIR
WORKDIR /usr/src/index

#DEPENDENCIES
COPY package*.json ./ 

#RUN
RUN npm install
RUN npm tsc

#PACKAGE
COPY . .

#SET ENV & EXPOSE
ENV PORT=80
EXPOSE 80

#EXEC FORM
CMD ["npm", "start"]
