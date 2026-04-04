from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models.stream import Stream
from app.schemas.stream import StreamCreate, StreamRead, StreamUpdate

router = APIRouter(prefix="/streams", tags=["streams"])


@router.get("/", response_model=list[StreamRead])
def list_streams(session: Session = Depends(get_session)):
    statement = select(Stream).order_by(Stream.created_at.desc())
    return session.exec(statement).all()


@router.post("/", response_model=StreamRead, status_code=201)
def create_stream(body: StreamCreate, session: Session = Depends(get_session)):
    db_stream = Stream.model_validate(body)
    session.add(db_stream)
    session.commit()
    session.refresh(db_stream)
    return db_stream


@router.get("/{stream_id}", response_model=StreamRead)
def get_stream(stream_id: int, session: Session = Depends(get_session)):
    stream = session.get(Stream, stream_id)
    if not stream:
        raise HTTPException(status_code=404, detail="Stream not found")
    return stream


@router.patch("/{stream_id}", response_model=StreamRead)
def update_stream(
    stream_id: int, body: StreamUpdate, session: Session = Depends(get_session)
):
    stream = session.get(Stream, stream_id)
    if not stream:
        raise HTTPException(status_code=404, detail="Stream not found")
    update_data = body.model_dump(exclude_unset=True)
    stream.sqlmodel_update(update_data)
    stream.updated_at = datetime.now(UTC)
    session.add(stream)
    session.commit()
    session.refresh(stream)
    return stream


@router.delete("/{stream_id}", status_code=204)
def delete_stream(stream_id: int, session: Session = Depends(get_session)):
    stream = session.get(Stream, stream_id)
    if not stream:
        raise HTTPException(status_code=404, detail="Stream not found")
    session.delete(stream)
    session.commit()
