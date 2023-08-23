from pydantic import BaseModel
from typing import Optional


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    height: Optional[int]
    weight: Optional[int]
    age: Optional[int]
    sex: Optional[str]


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    height: Optional[int]
    weight: Optional[int]
    age: Optional[int]
    sex: Optional[str]


class AccountOutWithPassword(AccountOut):
    hashed_password: str
