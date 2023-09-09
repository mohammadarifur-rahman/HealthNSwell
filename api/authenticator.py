import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from models.accounts import AccountOut, AccountOutWithPassword
from queries.accounts import AccountRepository


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepository,
    ):
        return accounts.get_one(email)

    def get_account_getter(
        self,
        accounts: AccountRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.email, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
