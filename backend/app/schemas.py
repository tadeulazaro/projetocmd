from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str

class Category(CategoryBase):
    id: int
    class Config:
        orm_mode = True

class AccountBase(BaseModel):
    name: str

class Account(AccountBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True

class ExpenseBase(BaseModel):
    value: float
    date: date
    description: Optional[str]
    category_id: int
    account_id: int

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
