from pydantic import BaseModel

class SummaryResponse(BaseModel):
    filename: str
    summary: str
