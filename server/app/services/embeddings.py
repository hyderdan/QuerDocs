from langchain.embeddings import OpenAIEmbeddings
from app.config.settings import OPENAI_API_KEY
import os

os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY


def get_embeddings():
    return OpenAIEmbeddings()