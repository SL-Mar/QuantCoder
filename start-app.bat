@echo off
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Starting FastAPI backend with uvicorn...
uvicorn backend.main:app --reload

pause
