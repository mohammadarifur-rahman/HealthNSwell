from fastapi.testclient import TestClient
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from main import app
from queries.workouts import WorkoutRepository

client = TestClient(app)


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


account_id = 1


class MockWorkoutRepository:
    def get_all(self, account_id):
        return []


def test_get_all_workouts():
    app.dependency_overrides[WorkoutRepository] = MockWorkoutRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    response = client.get(f"api/workouts/{account_id}/")
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}
