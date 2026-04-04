from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.database import get_session
from app.schemas.stream import StreamCreate, StreamRead, StreamUpdate

router = APIRouter(prefix="/streams", tags=["streams"])


@router.get("/", response_model=list[StreamRead])
def list_streams(session: Session = Depends(get_session)):
    raise NotImplementedError


@router.post("/", response_model=StreamRead, status_code=201)
def create_stream(body: StreamCreate, session: Session = Depends(get_session)):
    raise NotImplementedError


@router.get("/{stream_id}", response_model=StreamRead)
def get_stream(stream_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError


@router.patch("/{stream_id}", response_model=StreamRead)
def update_stream(
    stream_id: int, body: StreamUpdate, session: Session = Depends(get_session)
):
    raise NotImplementedError


@router.delete("/{stream_id}", status_code=204)
def delete_stream(stream_id: int, session: Session = Depends(get_session)):
    raise NotImplementedError
