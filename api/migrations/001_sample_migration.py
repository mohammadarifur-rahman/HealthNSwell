steps = [
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            first_name VARCHAR(1000),
            last_name VARCHAR(1000),
            height INT,
            weight INT,
            age INT,
            sex VARCHAR(1000),
            hashed_password VARCHAR(1000) NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE accounts;
        """
    ],
    [
        ## Create the table
        """
        CREATE TABLE workouts (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            duration INT,
            activity_name VARCHAR(1000),
            account INT REFERENCES ACCOUNTS(id) ON DELETE CASCADE
        );
        """,
        ## Drop the table
        """
        DROP TABLE workouts;
        """
    ],
    [
        ## Create the table
        """
        CREATE TABLE exercises (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            sets INT NOT NULL,
            reps INT NOT NULL,
            weight INT,
            rest_between_sets INT NOT NULL,
            rest_between_exercises INT NOT NULL,
            workout INT REFERENCES WORKOUTS(id) ON DELETE CASCADE
        );
        """,
        ## Drop the table
        """
        DROP TABLE exercises;
        """
    ]
]
