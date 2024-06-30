To get started, run the following commands:

1. Create a postgres database with table `Posts` and columns `title`, `content`

<img width="704" alt="Screen Shot 2024-06-29 at 8 39 00 PM" src="https://github.com/itsgivingchaotica/blogexample/assets/91578619/ad5f7066-2c4b-41a7-a78f-150e216eda5e">


3. Create an `.env` file within the server directory with the following variables set:

```
DB_USER=
DB_HOST=
DB_PORT=
DB_DATABASE=
```

3. Start the server:

   - `cd server && yarn install && yarn start`

4. In a new terminal, start the client:
   - `cd client && yarn install && yarn dev`
