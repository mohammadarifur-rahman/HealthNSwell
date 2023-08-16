steps = [
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
