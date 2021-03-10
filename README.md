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

## TBD

- Unit Tests
- Increase token validation (set up logged user and validate)
