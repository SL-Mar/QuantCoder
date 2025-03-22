from fastapi import FastAPI
from backend.routers.summarizer import router

app = FastAPI(title="QuantCoder API")
app.include_router(router, prefix="/summarizer")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

