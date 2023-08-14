from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    height: int
    weight: int
    age: int
    sex: str


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    height: int
    weight: int
    age: int
    sex: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str
