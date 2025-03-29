from crewai import Crew, Task, Process
from langchain_openai import ChatOpenAI
from backend.models.summarymodel import SummaryResponse  # Assumed Pydantic model for output
from backend.core.config import settings

# Import agents defined in agents.py
from backend.agents.summarization_agents import insights_extraction_agent, summary_synthesis_agent, refinement_agent

# Initialize the manager LLM with a low temperature for consistency.
manager_llm = ChatOpenAI(
    model=settings.model_name, 
    api_key=settings.openai_api_key, 
    temperature=0
)

# Task 1: Extract actionable trading insights from the FX article.
insights_task = Task(
    description=(
        "Extract actionable insights from the research article at {pdf_path}. "
        "When relavant, identify trading set-ups, investment themes, economical prospects and forecats, reversion and trading patterns, key price benchmarks (e.g., moving averages), risk factors, and specific recommendations for long and short strategies. "
        "Include any relevant quantitative data such as statistical test results or other indicators."
    ),
    expected_output=(
        "A detailed list of actionable trading insights including key signals, quantitative details, and strategic recommendations."
    ),
    agent=insights_extraction_agent,
)

# Task 2: Synthesize a concise summary based on the extracted insights.
summary_task = Task(
    description=(
        "Using the insights extracted from the article, create a concise summary (~1000 words) in bullet-point format. "
        "Highlight key price levels, market signals, risk management tips, and actionable recommendations for FX trading. "
        "Incorporate any quantitative or statistical evidence found."
    ),
    expected_output=(
        "A SummaryResponse object containing:\n"
        "- filename: source PDF name\n"
        "- summary: a bullet-point summary with detailed actionable trading insights."
    ),
    context=[insights_task],
    output_pydantic=SummaryResponse,
    agent=summary_synthesis_agent,
)

# Task 3: Refine the synthesized summary for clarity and completeness.
refinement_task = Task(
    description=(
        "Refine the trading insights summary generated in the previous task. Improve the clarity, coherence, and completeness of the report. "
        "Ensure all key actionable insights, including quantitative details, are clearly articulated in a bullet-point format."
    ),
    expected_output=(
        "A refined SummaryResponse object with a polished and comprehensive bullet-point summary of actionable trading insights,"
        "written in valid Markdown, with a title, headings for each major section, blank line after each headings, bullet points for each insight, and any tables or lists in Markdown format."
    ),
    context=[summary_task],
    output_pydantic=SummaryResponse,
    agent=refinement_agent,
)

# Build the complete workflow with iterative refinement.
summarization_workflow = Crew(
    agents=[insights_extraction_agent, summary_synthesis_agent, refinement_agent],
    tasks=[insights_task, summary_task, refinement_task],
    manager_llm=manager_llm,
    process=Process.sequential,
    verbose=True,
)
