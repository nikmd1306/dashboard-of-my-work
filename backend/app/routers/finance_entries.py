from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.database import get_session
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
    raise NotImplementedError


@router.post("/", response_model=FinanceEntryRead, status_code=201)
def create_finance_entry(
    body: FinanceEntryCreate, session: Session = Depends(get_session)
):
    raise NotImplementedError


@router.get("/{entry_id}", response_model=FinanceEntryRead)
def get_finance_entry(entry_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError


@router.patch("/{entry_id}", response_model=FinanceEntryRead)
def update_finance_entry(
    entry_id: int, body: FinanceEntryUpdate, session: Session = Depends(get_session)
):
    raise NotImplementedError


@router.delete("/{entry_id}", status_code=204)
def delete_finance_entry(entry_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError
