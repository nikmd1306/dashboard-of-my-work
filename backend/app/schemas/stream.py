import datetime

from pydantic import BaseModel, ConfigDict

from app.models.stream import StreamStatus, StreamType


class StreamCreate(BaseModel):
    name: str
    type: StreamType
    status: StreamStatus = StreamStatus.ACTIVE
    description: str | None = None


class StreamUpdate(BaseModel):
    name: str | None = None
    type: StreamType | None = None
    status: StreamStatus | None = None
    description: str | None = None


class StreamRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    type: StreamType
    status: StreamStatus
    description: str | None
    created_at: datetime.datetime
    updated_at: datetime.datetime
