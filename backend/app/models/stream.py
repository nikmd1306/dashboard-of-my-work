import enum
from datetime import UTC, datetime

from sqlmodel import Field, SQLModel


class StreamType(enum.StrEnum):
    FREELANCE = "freelance"
    EMPLOYMENT = "employment"
    BUSINESS = "business"
    OTHER = "other"


class StreamStatus(enum.StrEnum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"


def _utcnow() -> datetime:
    return datetime.now(UTC)


class Stream(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=200)
    type: StreamType
    status: StreamStatus = StreamStatus.ACTIVE
    description: str | None = Field(default=None, max_length=1000)
    created_at: datetime = Field(default_factory=_utcnow)
    updated_at: datetime = Field(default_factory=_utcnow)
