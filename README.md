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
- GET / (Get all)
- GET /:id (Get by task ID)
- POST / (Post new task)
- PATCH / (Update task)
- DELETE /:id (Delete task by ID)

# Available frontend functions:
- Can create new tasks
- Can delete current tasks
- Can update current tasks

# Future features:
- Search function for Tasks (By ID, by title, by due date)

# Current Bugs:
- I forgot SQL hates camelCase and so somewhere with my due_date & due_date variables, they're being sent to the backend wrong and as such coming back 'undefined'
and then you can't update ones without a due_date because the code freaks out and I'll have to go fix this BUT I'm running out of time.
If you encounter this bug, just create a new task, make SURE to assign a due date and then click 'update' on it to mess with the values and you will see them change on
the frontend. Apologies for this! I will try fix this bug tomorrow.