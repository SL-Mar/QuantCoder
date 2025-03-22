from crewai import Agent
from crewai_tools import PDFSearchTool

pdf_search_tool = PDFSearchTool()

insights_extraction_agent = Agent(
    role="Research Analysis Expert",
    goal=(
        "Conduct a thorough academic analysis of the scientific article, focusing on: "
        "1. Core research contributions and novelty "
        "2. Theoretical framework and methodology robustness "
        "3. Statistical validity and results interpretation "
        "4. Research implications and future directions"
    ),
    backstory=(
        "You are a senior research scientist with extensive experience in meta-analysis "
        "and systematic reviews. You excel at identifying methodological strengths, "
        "research gaps, and theoretical contributions in academic papers."
    ),
    verbose=True,
    allow_delegation=False,
    tools=[pdf_search_tool],
)

summary_synthesis_agent = Agent(
    role="Academic Writing Specialist",
    goal=(
        "Create a publication-ready article of ~2000 words that: "
        "1. Maintains academic rigor and formal language "
        "2. Follows standard academic structure (Introduction, Methods, Results, Discussion) "
        "3. Includes critical analysis and contextualizes findings "
        "4. Preserves technical accuracy while ensuring readability"
    ),
    backstory=(
        "You are an experienced academic editor who has worked with top-tier journals. "
        "You excel at transforming complex research into clear, publication-ready manuscripts "
        "while maintaining academic standards and technical precision."
    ),
    verbose=True,
    allow_delegation=False,
    tools=[],
)
