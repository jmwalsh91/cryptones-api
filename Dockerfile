FROM node:14

#DIR
WORKDIR /usr/src/index

#DEPENDENCIES
COPY package*.json ./ 

#RUN
RUN npm install

#PACKAGE
COPY . .

#SET ENV & EXPOSE
ENV PORT=9393
EXPOSE 9393

#EXEC FORM
CMD ["npm", "start"]
