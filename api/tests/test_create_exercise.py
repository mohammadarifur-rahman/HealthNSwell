from fastapi.testclient import TestClient
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from main import app
from queries.exercises import ExerciseRepository

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


class MockExerciseRepository:
    def create(self, exercise):
        result = {
            "id": 0,
            "name": "string",
            "sets": 0,
            "reps": 0,
            "weight": 0,
            "rest_between_sets": 0,
            "rest_between_exercises": 0,
            "workout": 0,
        }
        result.update(exercise)
        return result


def test_create_exercise():
    app.dependency_overrides[ExerciseRepository] = MockExerciseRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    json = {
        "name": "string",
        "sets": 0,
        "reps": 0,
        "weight": 0,
        "rest_between_sets": 0,
        "rest_between_exercises": 0,
        "workout": 0,
    }
    expected = {
        "id": 0,
        "name": "string",
        "sets": 0,
        "reps": 0,
        "weight": 0,
        "rest_between_sets": 0,
        "rest_between_exercises": 0,
        "workout": 0,
    }
    response = client.post("/api/exercises/", json=json)
    assert response.status_code == 200
    assert response.json() == expected
    app.dependency_overrides = {}
