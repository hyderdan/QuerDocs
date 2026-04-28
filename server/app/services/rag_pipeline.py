from langchain.chat_models import ChatOpenAI
from app.services.vector_store import get_vector_store


def ask_question(question):
    vector_store = get_vector_store()

    if vector_store is None:
        return "Please upload a PDF first."

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3}
    )

    docs = retriever.get_relevant_documents(question)

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    llm = ChatOpenAI(
        model_name="gpt-4o-mini"
    )

    prompt = f"""
Answer the question based only on the context below.

Context:
{context}

Question:
{question}
"""

    response = llm.predict(prompt)

    return response