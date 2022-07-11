
from pydantic import BaseModel
from typing import Dict


class Task(BaseModel):
    id: str
    content: str

class Tasks(BaseModel):
    __root__: dict[str, Task]

class Column(BaseModel):
    id: str
    title: str
    taskIds: list

class Columns(BaseModel):
    __root__: dict[str, Column]

class Board(BaseModel):
    tasks: Tasks
    columns: Columns
    columnOrder: list