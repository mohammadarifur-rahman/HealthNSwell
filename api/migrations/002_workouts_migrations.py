steps = [
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
    ]
]
