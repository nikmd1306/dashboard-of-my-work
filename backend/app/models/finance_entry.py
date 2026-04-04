import enum
from datetime import UTC, date, datetime

from sqlmodel import Field, SQLModel


class FinanceEntryType(enum.StrEnum):
    INCOME = "income"
    EXPENSE = "expense"


def _utcnow() -> datetime:
    return datetime.now(UTC)


class FinanceEntry(SQLModel, table=True):
    __tablename__ = "finance_entry"

    id: int | None = Field(default=None, primary_key=True)
    stream_id: int = Field(foreign_key="stream.id", index=True)
    date: date
    amount: float = Field(gt=0)
    type: FinanceEntryType
    description: str | None = Field(default=None, max_length=500)
    created_at: datetime = Field(default_factory=_utcnow)
