from fastapi import APIRouter, Depends
from authenticator import authenticator
from typing import List, Union, Optional
from queries.exercises import (
    Error,
    ExerciseIn,
    ExerciseRepository,
    ExerciseOut,
)

router = APIRouter()


@router.post("/", response_model=Union[ExerciseOut, Error])
async def create_exercises(
    exercise: ExerciseIn,
    repo: ExerciseRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.create(exercise)


@router.get("/{workout_id}/", response_model=Union[List[ExerciseOut], Error])
async def get_all(
    workout_id: int,
    repo: ExerciseRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_all(workout_id)


@router.put("/{exercise_id}/", response_model=Union[ExerciseOut, Error])
async def update_exercise(
    exercise_id: int,
    exercise: ExerciseIn,
    repo: ExerciseRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, ExerciseOut]:
    if account_data:
        return repo.update(exercise_id, exercise)


@router.delete("/{exercise_id}/", response_model=bool)
async def delete_exercise(
    exercise_id: int,
    repo: ExerciseRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete(exercise_id)


@router.get("/{exercise_id}/", response_model=Optional[ExerciseOut])
async def get_one_exercise(
    exercise_id: int,
    repo: ExerciseRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ExerciseOut:
    if account_data:
        exercise = repo.get_one(exercise_id)
        return exercise
