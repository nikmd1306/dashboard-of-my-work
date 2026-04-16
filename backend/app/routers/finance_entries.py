from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models.finance_entry import FinanceEntry
from app.models.stream import Stream
from app.schemas.finance_entry import (
    FinanceEntryCreate,
    FinanceEntryRead,
    FinanceEntryUpdate,
)

router = APIRouter(prefix="/finance-entries", tags=["finance-entries"])


@router.get("/", response_model=list[FinanceEntryRead])
def list_finance_entries(
    stream_id: int | None = None, session: Session = Depends(get_session)
):
    statement = select(FinanceEntry).order_by(
        FinanceEntry.date.desc(), FinanceEntry.created_at.desc()
    )
    if stream_id is not None:
        statement = statement.where(FinanceEntry.stream_id == stream_id)
    return session.exec(statement).all()


@router.post("/", response_model=FinanceEntryRead, status_code=201)
def create_finance_entry(
    body: FinanceEntryCreate, session: Session = Depends(get_session)
):
    if not session.get(Stream, body.stream_id):
        raise HTTPException(status_code=404, detail="Stream not found")
    entry = FinanceEntry.model_validate(body)
    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.get("/{entry_id}", response_model=FinanceEntryRead)
def get_finance_entry(entry_id: int, session: Session = Depends(get_session)):
    entry = session.get(FinanceEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Finance entry not found")
    return entry


@router.patch("/{entry_id}", response_model=FinanceEntryRead)
def update_finance_entry(
    entry_id: int, body: FinanceEntryUpdate, session: Session = Depends(get_session)
):
    entry = session.get(FinanceEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Finance entry not found")
    update_data = body.model_dump(exclude_unset=True)
    if "stream_id" in update_data:
        if not session.get(Stream, update_data["stream_id"]):
            raise HTTPException(status_code=404, detail="Stream not found")
    entry.sqlmodel_update(update_data)
    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.delete("/{entry_id}", status_code=204)
def delete_finance_entry(entry_id: int, session: Session = Depends(get_session)):
    entry = session.get(FinanceEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Finance entry not found")
    session.delete(entry)
    session.commit()
