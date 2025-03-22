import os
from fastapi import UploadFile

# Directory where summaries (and uploaded PDFs) live
SUMMARY_STORAGE_DIR = os.getenv("SUMMARY_STORAGE_DIR", os.path.join(os.getcwd(), "summaries"))
os.makedirs(SUMMARY_STORAGE_DIR, exist_ok=True)

async def save_uploaded_file(file: UploadFile) -> str:
    """
    Save an uploaded file to disk and return its path.
    """
    path = os.path.join(SUMMARY_STORAGE_DIR, file.filename)
    contents = await file.read()
    with open(path, "wb") as f:
        f.write(contents)
    return path

def save_file(path: str, content: str):
    """
    Write text content to the given path (creating parent dirs as needed).
    """
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def delete_file(path: str):
    """
    Remove a file if it exists.
    """
    if os.path.exists(path):
        os.remove(path)

def list_summaries() -> list[str]:
    """
    Return filenames of all saved summaries.
    """
    return [
        fname
        for fname in os.listdir(SUMMARY_STORAGE_DIR)
        if os.path.isfile(os.path.join(SUMMARY_STORAGE_DIR, fname))
    ]
