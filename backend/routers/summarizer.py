from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from backend.workflows.summarization_workflow import summarization_workflow
from backend.models.summarymodel import SummaryResponse
from backend.utils.file_utils import save_uploaded_file, save_file, delete_file, list_summaries
from backend.core.logger_config import logger
from backend.core.llm_cost import LLMCost
from backend.core.config import settings
import os, traceback
from tempfile import NamedTemporaryFile

router = APIRouter(tags=["Summarization"])
process_name = "Summarization"
SUMMARY_STORAGE_DIR = os.getenv("SUMMARY_STORAGE_DIR", os.path.join(os.getcwd(), "summaries"))

@router.get("/ping")
async def ping():
    return {"status": "pong"}

@router.post("/extract", response_model=SummaryResponse)
async def extract_scientific_summary(file: UploadFile = File(...)):
    try:
        logger.info(f"Received file: {file.filename}")

        # ✅ Save permanently to summaries folder
        pdf_path = await save_uploaded_file(file)
        logger.info(f"Saved PDF to: {pdf_path}")

        # 🧠 Run workflow
        summary_result = summarization_workflow.kickoff(inputs={"pdf_path": pdf_path})

        # 💰 Track LLM token cost
        token_count = (
            summarization_workflow.usage_metrics.prompt_tokens +
            summarization_workflow.usage_metrics.completion_tokens
        )
        LLMCost.update_cost(process_name, token_count)

        return summary_result.to_dict()

    except Exception as e:
        logger.error("Error during summarization", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/load/{filename}", response_model=dict)
async def load_summary(filename: str):
    path = os.path.join(SUMMARY_STORAGE_DIR, filename if filename.endswith(".txt") else f"{os.path.splitext(filename)[0]}.txt")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Summary file not found")
    with open(path, "r", encoding="utf-8") as f:
        return {"message": "Summary loaded successfully", "content": f.read(), "filename": filename}

@router.post("/save", response_model=dict)
async def save_summary(data: SummaryResponse):
    filename = f"{os.path.splitext(data.filename)[0]}.txt"
    path = os.path.join(SUMMARY_STORAGE_DIR, filename)
    save_file(path, data.summary)
    return {"message": "Summary saved successfully", "filename": filename}

@router.get("/list", response_model=dict)
async def get_summaries():
    return {"summaries": list_summaries()}

@router.delete("/{filename}", response_model=dict)
async def delete_summary(filename: str):
    path = os.path.join(SUMMARY_STORAGE_DIR, filename)
    delete_file(path)
    return {"message": "Summary deleted successfully"}

@router.get("/pdf/{filename}")
async def get_pdf(filename: str):
    path = f"path/to/pdfs/{filename}"
    if os.path.exists(path):
        return FileResponse(path, media_type="application/pdf")
    raise HTTPException(status_code=404, detail="PDF not found")
