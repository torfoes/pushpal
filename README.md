### Backend (Ruby on Rails)
**Prerequisites:** Make sure you have Docker installed. If not, go install that first.



**Start the Backend:**
```sh
cd backend
docker compose up -d
docker exec -it pushpal_backend /bin/bash
cd csce431
bundle install
rails db:create
rails db:migrate
rails server --binding=0.0.0.0
```

### Frontend (Node.js)
**Prerequisites:** Ensure you have Node.js installed. If you're missing it, sort that out.

**Install Dependencies:**
```sh
cd frontend
npm install
```

**Start the Frontend:**
```sh
npm run dev
```


## NOTE
The frontend and backend MUST share the same AUTH_SECRET enviroment variable. This is how we authenticate requests.

Send me a DM and I can hook you up with the .env values needed to run the application. 


## Additional Notes

https://ui.shadcn.com/docs/components/form

This is a good guide for implementing forms with validation. You guys might check out this tutorial


Also, if you are confused about routing and anything regarding nextjs,
https://nextjs.org/docs/