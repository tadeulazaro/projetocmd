
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.routers import users, auth, expenses, categories, accounts

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Controle de Despesas API")

# Configurar CORS para permitir o frontend Vercel
app.add_middleware(
	CORSMiddleware,
	allow_origins=[
		"https://cashpilot-psi.vercel.app",
		"https://cashpilot-git-main-lazaros-projects-08c06938.vercel.app",
		"https://cashpilot-f3sjoqxgj-lazaros-projects-08c06938.vercel.app"
	],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(categories.router)
app.include_router(accounts.router)
