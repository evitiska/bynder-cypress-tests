FROM cypress/included:14.2.0

WORKDIR /app

COPY . .

RUN npm install
