FROM cypress/browsers:22.14.0

WORKDIR /app

COPY . .

RUN npm install

RUN npx cypress install

EXPOSE 3000

CMD ["npm", "run", "cypress:tests"]
