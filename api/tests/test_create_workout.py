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


class MockWorkoutRepository:
    def create(self, workout):
        result = {
            "id": 0,
            "name": "string",
            "description": "string",
            "duration": "string",
            "activity_name": "string",
            "account": 0,
        }
        result.update(workout)
        return result


def test_create_workout():
    app.dependency_overrides[WorkoutRepository] = MockWorkoutRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    json = {
        "name": "string",
        "description": "string",
        "duration": "string",
        "activity_name": "string",
        "account": 0,
    }
    expected = {
        "id": 0,
        "name": "string",
        "description": "string",
        "duration": "string",
        "activity_name": "string",
        "account": 0,
    }
    response = client.post("/api/workouts/", json=json)
    assert response.status_code == 200
    assert response.json() == expected
    app.dependency_overrides = {}
