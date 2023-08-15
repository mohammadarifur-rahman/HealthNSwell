from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from typing import List, Union, Optional
from authenticator import authenticator
from pydantic import BaseModel
from models.accounts import (
    Error,
    AccountIn,
    AccountOut,
    DuplicateAccountError,
)
from queries.accounts import AccountRepository


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

@router.put("/{account_id}/", response_model=Union[AccountOut, Error])
async def update_accounts(
    info: AccountIn,
    account_id: int,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, AccountOut]:
    if account_data:
        hashed_password = authenticator.hash_password(info.password)
        return repo.update(account_id, info, hashed_password)
