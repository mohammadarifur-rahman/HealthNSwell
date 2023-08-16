from fastapi import APIRouter, Depends
from typing import List, Union, Optional
from authenticator import authenticator
from queries.workouts import Error, WorkoutIn, WorkoutRepository, WorkoutOut

router = APIRouter()


@router.post("/", response_model=Union[WorkoutOut, Error])
async def create_workouts(
    workout: WorkoutIn,
    repo: WorkoutRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.create(workout)


@router.get("/", response_model=Union[List[WorkoutOut], Error])
async def get_all(
    repo: WorkoutRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_all()


@router.put("/{workout_id}/", response_model=Union[WorkoutOut, Error])
async def update_workout(
    workout_id: int,
    workout: WorkoutIn,
    repo: WorkoutRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, WorkoutOut]:
    if account_data:
        return repo.update(workout_id, workout)


@router.delete("/{workout_id}/", response_model=bool)
async def delete_workout(
    workout_id: int,
    repo: WorkoutRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete(workout_id)


@router.get("/{workout_id}/", response_model=Optional[WorkoutOut])
async def get_one_workout(
    workout_id: int,
    repo: WorkoutRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> WorkoutOut:
    if account_data:
        workout = repo.get_one(workout_id)
        return workout
