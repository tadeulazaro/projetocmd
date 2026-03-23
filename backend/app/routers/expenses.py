
from fastapi import APIRouter, Depends, HTTPException
from app import schemas, auth
import json
import os
from datetime import date

router = APIRouter(prefix="/expenses", tags=["expenses"])


DESPESAS_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'despesas.json')

def load_despesas():
    if not os.path.exists(DESPESAS_FILE):
        return []
    with open(DESPESAS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_despesas(despesas):
    with open(DESPESAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(despesas, f, ensure_ascii=False, indent=2, default=str)

@router.get("/", response_model=list[schemas.Expense])
def list_expenses(current_user: dict = Depends(auth.get_current_user)):
    despesas = load_despesas()
    # Filtra despesas do usuário logado
    return [d for d in despesas if d['user_id'] == current_user['id']]

@router.post("/", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, current_user: dict = Depends(auth.get_current_user)):
    despesas = load_despesas()
    new_id = max([d['id'] for d in despesas], default=0) + 1
    new_exp = {
        'id': new_id,
        'value': expense.value,
        'date': str(expense.date),
        'description': expense.description,
        'user_id': current_user['id'],
        'category_id': expense.category_id,
        'account_id': expense.account_id
    }
    despesas.append(new_exp)
    save_despesas(despesas)
    return new_exp
