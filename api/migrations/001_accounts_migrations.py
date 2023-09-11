steps = [
    [
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
        """
        DROP TABLE accounts;
        """
    ]
]
