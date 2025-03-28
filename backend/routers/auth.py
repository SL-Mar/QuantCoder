# backend/routers/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.utils.auth_utils import verify_password, create_access_token

router = APIRouter()

# TEMP user – replace with database lookup later
FAKE_USER = {
    "email": "test@example.com",
    "hashed_password": "$2b$12$Q3v3SVBOuz/S01Na4ocQEu7d6XVIJ6GXgXayNZknA2trhBNvAuxDy",  # hashed version of "test123"
}

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    if req.email != FAKE_USER["email"]:
        raise HTTPException(status_code=401, detail="User not found")
    if not verify_password(req.password, FAKE_USER["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token({"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}
