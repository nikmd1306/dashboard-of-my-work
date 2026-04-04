import datetime

from pydantic import BaseModel, ConfigDict

from app.models.finance_entry import FinanceEntryType


class FinanceEntryCreate(BaseModel):
    stream_id: int
    date: datetime.date
    amount: float
    type: FinanceEntryType
    description: str | None = None


class FinanceEntryUpdate(BaseModel):
    stream_id: int | None = None
    date: datetime.date | None = None
    amount: float | None = None
    type: FinanceEntryType | None = None
    description: str | None = None


class FinanceEntryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    stream_id: int
    date: datetime.date
    amount: float
    type: FinanceEntryType
    description: str | None
    created_at: datetime.datetime
