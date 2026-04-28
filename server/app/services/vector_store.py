from langchain.vectorstores import FAISS

vector_store = None


def save_to_vector_store(chunks, embeddings):
    global vector_store
    vector_store = FAISS.from_documents(chunks, embeddings)
    return vector_store


def get_vector_store():
    return vector_store