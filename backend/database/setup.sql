DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(30),
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('complete', 'in progress', 'incomplete')),
    post_date DATE,
    due_date DATE
);

INSERT INTO tasks (title, description, status, post_date, due_date)
VALUES
    ('Update database', 'we need more values in our data', 'incomplete', '2025-04-26', '2025-04-28'),
    ('Fix security vulnerability', 'our api is not secure and safe', 'in progress', '2025-04-23', '2025-04-30'),
    ('Pet cat', 'give the cat some cuddles!', 'complete', '2025-04-01', '2025-04-02'),
    ('Say hello!', 'leave me a nice message.', 'in progress', '2025-04-28', '2025-06-01');
