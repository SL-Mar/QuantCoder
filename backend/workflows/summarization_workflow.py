from crewai import Crew, Task, Process
from langchain_openai import ChatOpenAI
from backend.agents.summarization_agents import insights_extraction_agent, summary_synthesis_agent
from backend.models.summarymodel import SummaryResponse
from backend.core.config import settings
from langchain_mistralai import ChatMistralAI


manager_llm = ChatOpenAI(model=settings.model_name, api_key=settings.openai_api_key, temperature=0)

# Enhanced tasks with more specific requirements
insights_task = Task(
    description=(
        "Analyze the article at {pdf_path} following these steps:\n"
        "1. Identify the theoretical framework and research paradigm\n"
        "2. Evaluate methodology robustness and statistical approaches\n"
        "3. Assess result validity and significance\n"
        "4. Extract key tables, figures, and statistical findings\n"
        "5. Analyze limitations and future research directions\n"
        "6. Identify connections to existing literature\n"
        "Provide a structured analysis plan with these components."
    ),
    expected_output=(
        "A detailed academic analysis framework including:\n"
        "- Theoretical foundation\n"
        "- Methodological assessment\n"
        "- Statistical validity\n"
        "- Key findings and implications\n"
        "- Research limitations and future directions"
    ),
    agent=insights_extraction_agent,
)

summary_task = Task(
    description=(
        "Create a publication-ready article (~2000 words) following this structure:\n\n"
        "1. Abstract (150 words)\n"
        "   - Research context, objectives, methods, key findings, implications\n\n"
        "2. Introduction (400 words)\n"
        "   - Research context and significance\n"
        "   - Clear research objectives\n"
        "   - Theoretical framework\n\n"
        "3. Methods (450 words)\n"
        "   - Detailed methodology\n"
        "   - Statistical approaches\n"
        "   - Validation methods\n\n"
        "4. Results (500 words)\n"
        "   - Key findings with statistical evidence\n"
        "   - Data visualization descriptions\n\n"
        "5. Discussion (400 words)\n"
        "   - Interpretation of results\n"
        "   - Theoretical and practical implications\n"
        "   - Research limitations\n\n"
        "6. Conclusion (100 words)\n"
        "   - Key takeaways\n"
        "   - Future research directions\n\n"
        "Use formal academic language, maintain technical precision, "
        "and ensure proper transitions between sections."
    ),
    expected_output=(
        "A ScienceSummary object containing:\n"
        "- filename: source PDF name\n"
        "- summary: complete article text\n"
 
    ),
    context=[insights_task],
    output_pydantic=SummaryResponse,
    agent=summary_synthesis_agent,
)

summarization_workflow = Crew(
    agents=[insights_extraction_agent, summary_synthesis_agent],
    tasks=[insights_task, summary_task],
    manager_llm=manager_llm,
    process=Process.sequential,
    verbose=True,
)