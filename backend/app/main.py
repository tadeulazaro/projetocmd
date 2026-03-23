from fastapi import FastAPI
from app import models
from app.database import engine
from app.routers import users, auth, expenses, categories, accounts

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Controle de Despesas API")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(categories.router)
app.include_router(accounts.router)
