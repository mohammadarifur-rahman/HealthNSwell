from pydantic import BaseModel
from typing import Optional


class Error(BaseModel):
    message: str


class WorkoutIn(BaseModel):
    name: str
    description: str
    duration: Optional[int]
    activity_name: Optional[str]
    account: int


class WorkoutOut(BaseModel):
    id: int
    name: str
    description: str
    duration: Optional[int]
    activity_name: Optional[str]
    account: int
