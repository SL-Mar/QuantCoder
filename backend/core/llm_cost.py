class LLMCost:
    @staticmethod
    def update_cost(process_name: str, tokens: int):
        # TODO: replace with real cost‑tracking logic
        logger = __import__("backend.core.logger_config", fromlist=["logger"]).logger
        logger.info(f"LLM cost for {process_name}: {tokens} tokens")
