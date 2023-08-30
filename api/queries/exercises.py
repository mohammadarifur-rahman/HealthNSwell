from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from models.exercises import ExerciseIn, ExerciseOut, Error


class ExerciseRepository:
    def get_one(self, exercise_id: int) -> Optional[ExerciseOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , sets
                            , reps
                            , weight
                            , rest_between_sets
                            , rest_between_exercises
                            , workout
                        FROM exercises
                        WHERE id = %s
                        """,
                        [exercise_id],
                    )
                    record = result.fetchone()
                    return self.record_to_exercise_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that exercise"}

    def delete(self, exercise_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM exercises
                        WHERE id = %s
                        """,
                        [exercise_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, exercise_id: int, exercise: ExerciseIn
    ) -> Union[ExerciseOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE exercises
                        SET name = %s
                        , sets = %s
                        , reps = %s
                        , weight = %s
                        , rest_between_sets = %s
                        , rest_between_exercises = %s
                        , workout = %s
                        WHERE id = %s
                        """,
                        [
                            exercise.name,
                            exercise.sets,
                            exercise.reps,
                            exercise.weight,
                            exercise.rest_between_sets,
                            exercise.rest_between_exercises,
                            exercise.workout,
                            exercise_id,
                        ],
                    )
                    return self.exercise_in_to_out(exercise_id, exercise)
        except Exception as e:
            print(e)
            return {"message": "Could not update exercise"}

    def get_all(self, workout_id: int) -> Union[Error, List[ExerciseOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        , name
                        , sets
                        , reps
                        , weight
                        , rest_between_sets
                        , rest_between_exercises
                        , workout
                        FROM exercises
                        WHERE workout = %s
                        ORDER BY id;
                        """,
                        [workout_id],
                    )
                    return [
                        ExerciseOut(
                            id=record[0],
                            name=record[1],
                            sets=record[2],
                            reps=record[3],
                            weight=record[4],
                            rest_between_sets=record[5],
                            rest_between_exercises=record[6],
                            workout=record[7],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all exercises"}

    def create(self, exercise: ExerciseIn) -> Union[ExerciseOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                        (name, sets, reps, weight, rest_between_sets, rest_between_exercises, workout)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        exercise.name,
                        exercise.sets,
                        exercise.reps,
                        exercise.weight,
                        exercise.rest_between_sets,
                        exercise.rest_between_exercises,
                        exercise.workout,
                    ],
                )
                id = result.fetchone()[0]
                return self.exercise_in_to_out(id, exercise)

    def exercise_in_to_out(self, id: int, exercise: ExerciseIn):
        old_data = exercise.dict()
        return ExerciseOut(id=id, **old_data)

    def record_to_exercise_out(self, record):
        return ExerciseOut(
            id=record[0],
            name=record[1],
            sets=record[2],
            reps=record[3],
            weight=record[4],
            rest_between_sets=record[5],
            rest_between_exercises=record[6],
            workout=record[7],
        )
