### Backend (Ruby on Rails)
**Prerequisites:** Make sure you have Docker installed. If not, go install that first.



**Start the Backend:**
```sh
cd backend
docker-compose up -d
docker exec -it notifyme_backend /bin/bash
cd csce431
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