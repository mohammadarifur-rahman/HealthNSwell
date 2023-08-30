from fastapi.testclient import TestClient
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from main import app
from queries.accounts import AccountRepository

client = TestClient(app)


# override authentication
class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    height: Optional[int]
    weight: Optional[int]
    age: Optional[int]
    sex: Optional[str]


# override authentication
def fake_get_current_account_data():
    return AccountOut(
        id=1,
        email="test@email.com",
        first_name="John",
        last_name="Doe",
        height=72,
        weight=180,
        age=35,
        sex="male",
        )

class MockAccountRepository:
    def get_all(self):
        return []


def test_get_all_accounts():
    app.dependency_overrides[AccountRepository] = MockAccountRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    response = client.get("api/accounts/")
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}