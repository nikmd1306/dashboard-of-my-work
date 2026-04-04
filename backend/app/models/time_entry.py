from datetime import UTC, date, datetime

from sqlmodel import Field, SQLModel


def _utcnow() -> datetime:
    return datetime.now(UTC)


class TimeEntry(SQLModel, table=True):
    __tablename__ = "time_entry"

    id: int | None = Field(default=None, primary_key=True)
    stream_id: int = Field(foreign_key="stream.id", index=True)
    date: date
    hours: float = Field(gt=0, le=24)
    description: str | None = Field(default=None, max_length=500)
    created_at: datetime = Field(default_factory=_utcnow)
