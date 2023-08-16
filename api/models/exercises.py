from pydantic import BaseModel
from typing import Optional


class Error(BaseModel):
    message: str


class ExerciseIn(BaseModel):
    name: str
    sets: int
    reps: int
    weight: Optional[int]
    rest_between_sets: int
    rest_between_exercises: int
    workout: int


class ExerciseOut(BaseModel):
    id: int
    name: str
    sets: int
    reps: int
    weight: Optional[int]
    rest_between_sets: int
    rest_between_exercises: int
    workout: int
