from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database, auth

router = APIRouter(prefix="/accounts", tags=["accounts"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.Account])
def list_accounts(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Account).filter(models.Account.user_id == current_user.id).all()

@router.post("/", response_model=schemas.Account)
def create_account(account: schemas.AccountBase, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_acc = models.Account(name=account.name, user_id=current_user.id)
    db.add(new_acc)
    db.commit()
    db.refresh(new_acc)
    return new_acc
