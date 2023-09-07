from typing import List, Optional, Union
from queries.pool import pool
from models.workouts import WorkoutIn, WorkoutOut, Error


class WorkoutRepository:
    def get_one(self, workout_id: int) -> Optional[WorkoutOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , description
                            , duration
                            , activity_name
                            , account
                        FROM workouts
                        WHERE id = %s
                        """,
                        [workout_id],
                    )
                    record = result.fetchone()
                    return self.record_to_workout_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that workout"}

    def delete(self, workout_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM workouts
                        WHERE id = %s
                        """,
                        [workout_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, workout_id: int, workout: WorkoutIn
    ) -> Union[WorkoutOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE workouts
                        SET name = %s
                        , description = %s
                        , duration = %s
                        , activity_name = %s
                        , account = %s
                        WHERE id = %s
                        """,
                        [
                            workout.name,
                            workout.description,
                            workout.duration,
                            workout.activity_name,
                            workout.account,
                            workout_id,
                        ],
                    )
                    return self.workout_in_to_out(workout_id, workout)
        except Exception as e:
            print(e)
            return {"message": "Could not update workout"}

    def get_all(self, account_id: int) -> Union[Error, List[WorkoutOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        , name
                        , description
                        , duration
                        , activity_name
                        , account
                        FROM workouts
                        WHERE account = %s
                        ORDER BY id;
                        """,
                        [account_id],
                    )
                    return [
                        WorkoutOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            duration=record[3],
                            activity_name=record[4],
                            account=record[5],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all workouts"}

    def create(self, workout: WorkoutIn) -> Union[WorkoutOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO workouts
                        (name, description, duration, activity_name, account)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        workout.name,
                        workout.description,
                        workout.duration,
                        workout.activity_name,
                        workout.account,
                    ],
                )
                id = result.fetchone()[0]
                return self.workout_in_to_out(id, workout)

    def workout_in_to_out(self, id: int, workout: WorkoutIn):
        old_data = workout.dict()
        return WorkoutOut(id=id, **old_data)

    def record_to_workout_out(self, record):
        return WorkoutOut(
            id=record[0],
            name=record[1],
            description=record[2],
            duration=record[3],
            activity_name=record[4],
            account=record[5],
        )
