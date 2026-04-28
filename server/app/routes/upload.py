from fastapi import APIRouter, UploadFile, File
import shutil

from app.services.pdf_loader import load_and_split_pdf
from app.services.embeddings import get_embeddings
from app.services.vector_store import save_to_vector_store

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    chunks = load_and_split_pdf(file_path)
    embeddings = get_embeddings()

    save_to_vector_store(chunks, embeddings)

    return {
        "message": "PDF uploaded and processed successfully"
    }