# QuantCoder_FS — Full-Stack AI Assistant for Traders

QuantCoder_FS is a full-stack, AI-driven application that streamlines financial research and trading strategy development. The current open-source version focuses on the PDF summarization workflow, implemented as a FastAPI backend powered by CrewAI agents. Future updates will introduce a frontend (Next.js) and additional workflows, including fundamentals analysis and algorithmic code generation.

This public release is a clean refactoring of a previously completed private version of the app, which is already fully functional. Screenshots of the full-stack implementation are available in the QuantCoder_FS_Demo folder.
 

---

## 🚀 Quickstart (Backend Only)

### 1. Clone the repository

```bash
git clone https://github.com/SL-Mar/QuantCoder.git
cd QuantCoder
git checkout dev
```

### 2. Set up the environment (Windows)

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure your `.env` file in the root directory

```env
OPENAI_API_KEY=sk-...
MODEL_NAME=gpt-4
```

### 4. Start the backend

Use the batch file:

```bash
start-app.bat
```

Or manually:

```bash
uvicorn backend.main:app --reload --port 8000
```

---

## 🔍 Access the API

Once running, open your browser at:

📄 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

You’ll find the **interactive documentation** of the Summarization API there.

---

## 🧐 Current Workflow: Summarization

This initial release delivers QuantCoder’s first AI-powered workflow.

### ✨ Features:

- Upload a PDF
- Automatically extract and summarize financial insights
- Return a structured JSON response

### 📦 Folder Structure (`backend/` only)

```
backend/
├── core/                  # Configuration, logging, cost tracking
│   ├── config.py
│   ├── logger_config.py
│   └── llm_cost.py
├── routers/               # FastAPI endpoints
│   └── summarizer.py
├── agents/                # CrewAI agent definitions
│   └── summarization_agents.py
├── workflows/             # Crew orchestration logic
│   └── summarization_workflow.py
├── models/                # Pydantic schemas
│   └── summarymodel.py
└── utils/                 # File I/O helpers
    └── file_utils.py
```

### 🧪 Pydantic Response Model

```python
class SummaryResponse(BaseModel):
    filename: str
    summary: str
```

---

## 🛠 Future Development

- ✅ Current: Summarization backend only
- 🔜 Next: Frontend integration (Next.js)
- 📈 Roadmap: Additional workflows (Fundamentals, CodeGen, Risk, Forecasting...)

---

## 🔭 Legacy Version

The original CLI-based QuantCoder is preserved in the `quantcoder-legacy` branch.

It includes:

- Article search and PDF summarization
- Trading strategy generation for QuantConnect
- A simple command-line interface

If you're interested in the roots of this project, you can switch to it:

```bash
git checkout quantcoder-legacy
```

And follow its dedicated [README](https://github.com/SL-Mar/QuantCoder/blob/quantcoder-legacy/README.md).

---

## 📄 License

To be defined. This project is currently open for contribution and collaboration.

---

## 📚 Related Reading

- 📘 [QuantCoder_FS Documentation](https://medium.com/@sl_mar/quantcoder-fs-documentation-6fc79915e287)
- 📘 [Towards Automating Quantitative Finance Research](https://medium.com/ai-advances/towards-automating-quantitative-finance-research-c868a2a6477e)

