from typing import Optional, Union
from queries.pool import pool
from models.accounts import AccountIn, AccountOut, Error, AccountOutWithPassword


class AccountRepository:
    def get_one(self, email: str) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT email
                            , id
                            , first_name
                            , last_name
                            , height
                            , weight
                            , age
                            , sex
                            , hashed_password
                        FROM accounts
                        WHERE email = %s
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def create(self, account: AccountIn, hashed_password: str) -> Union[AccountOutWithPassword, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (email, first_name, last_name, height, weight, age, sex, hashed_password)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        account.first_name,
                        account.last_name,
                        account.height,
                        account.weight,
                        account.age,
                        account.sex,
                        hashed_password,
                    ]
                )
                id = result.fetchone()[0]
                return self.account_in_to_out(id, account)
    def update(
        self, account_id: int, account: AccountIn, hashed_password: str
    ) -> Union[AccountOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET email = %s
                        , first_name = %s
                        , last_name = %s
                        , height = %s
                        , weight = %s
                        , age = %s
                        , sex = %s
                        , hashed_password = %s
                        WHERE id = %s
                        """,
                        [
                            account.email,
                            account.first_name,
                            account.last_name,
                            account.height,
                            account.weight,
                            account.age,
                            account.sex,
                            hashed_password,
                            account_id,
                        ],
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update account"}


    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOutWithPassword(
            email=record[0],
            id=record[1],
            first_name=record[2],
            last_name=record[3],
            height=record[4],
            weight=record[5],
            age=record[6],
            sex=record[7],
            hashed_password=record[8],
        )
