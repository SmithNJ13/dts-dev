## Installation and Usage:
1. Git Clone and cd into root folder
2. start docker locally and run docker compose up -d
3. npm install
4. create .env file on the backend with the following:
    ```
    PORT=5433
    DB_URL=postgres://admin:1z2y3x@localhost:5432/hmcts_tasks
    ```
5. cd into backend
6. npm run start
7. cd into frontend
8. npm run dev

# Available backend endpoints:
A. GET / (Get all)
B. GET /:id (Get by task ID)
C. POST / (Post new task)
D. PATCH / (Update task)
E. DELETE /:id (Delete task by ID)

# Available frontend functions:
A. Can create new tasks
B. Can delete current tasks
C. Can update current tasks

# Future features:
- Search function for Tasks (By ID, by title, by due date)