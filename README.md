# chat-api-bot

## Chat API that can integrate with Bot modules

<hr/>
<br/>

## Archievements

- Authenticated Users
- Multiple Chat Rooms
- Can be integrated to bots

## Available Routes

<br/>

- `POST /api/v1/user/` - Create User
- `POST /api/v1/user/login` - Authenticate user
- `GET /ai/v1/message/:roomId` - Retrieve the latest 50 messages given a room : `roomId`

P.S. : All routes requires and authorization token `authorization : 't0k3nh3r3'`

<hr/>
<br/>

## Bots

This API services use the bot list below:

- Stock Bot - [check out here](https://github.com/cotts/chat-bot)
- - Command to call bot inside the rooms: `/stock=STOCK_CODE`

<br/>
<hr/>
<br/>

## How to run

1- Install dependencies

```bash
npm i
##or
yarn
```

2- Set environment keys

```bash
PORT=         #Server Port:Default 5000
DB_HOST=      #Database Host (mongoDB)
DB_USER=      #Database user
DB_PASS=      #Database password
DB_NAME=      #Database name
APIKEY=       #Authorization APIKEY
PASSWORD_KEY= #Password Encryption Key
CORS_LIST=    #Socket CORS sites authorized
ROOMS_LIST=   #Socket Rooms List
BOT_LIST=     #Authorized Bot List
```

3 - Run Service

> 3.1 - In Development Mode

```bash
npm run dev
#or
yarn dev
```

> 3.2 - In Production Mode

```bash
npm start
#or
yarn start
```

<br/>
<hr/>

## TBD

- Unit Tests
- Increase token validation
- Set up socket Token
