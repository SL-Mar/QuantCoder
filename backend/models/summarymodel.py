from pydantic import BaseModel
import markdown

class SummaryResponse(BaseModel):
    filename: str
    summary: str  # Assume summary is formatted as markdown text
