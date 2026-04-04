from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.database import get_session
from app.schemas.time_entry import TimeEntryCreate, TimeEntryRead, TimeEntryUpdate

router = APIRouter(prefix="/time-entries", tags=["time-entries"])


@router.get("/", response_model=list[TimeEntryRead])
def list_time_entries(
    stream_id: int | None = None, session: Session = Depends(get_session)
):
    raise NotImplementedError


@router.post("/", response_model=TimeEntryRead, status_code=201)
def create_time_entry(body: TimeEntryCreate, session: Session = Depends(get_session)):
    raise NotImplementedError


@router.get("/{entry_id}", response_model=TimeEntryRead)
def get_time_entry(entry_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError


@router.patch("/{entry_id}", response_model=TimeEntryRead)
def update_time_entry(
    entry_id: int, body: TimeEntryUpdate, session: Session = Depends(get_session)
):
    raise NotImplementedError


@router.delete("/{entry_id}", status_code=204)
def delete_time_entry(entry_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError
