import datetime

from pydantic import BaseModel, ConfigDict


class TimeEntryCreate(BaseModel):
    stream_id: int
    date: datetime.date
    hours: float
    description: str | None = None


class TimeEntryUpdate(BaseModel):
    stream_id: int | None = None
    date: datetime.date | None = None
    hours: float | None = None
    description: str | None = None


class TimeEntryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    stream_id: int
    date: datetime.date
    hours: float
    description: str | None
    created_at: datetime.datetime
