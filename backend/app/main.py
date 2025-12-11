"""
FastAPI application for PDF Summary App.
Imports API routes from app/api/endpoints.py.
"""


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
	from app.api.endpoints import router
except ImportError:
	router = None

app = FastAPI()

# Allow CORS for frontend (adjust origins as needed)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # For dev, allow all. For prod, specify frontend URL.
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

if router:
	app.include_router(router)
