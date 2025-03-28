from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # clearly import this
from backend.routers.summarizer import router

app = FastAPI(title="QuantCoder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL clearly here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/summarizer")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
