import { useState } from "react";
import { uploadDocument } from "../Api"

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFIleUplaod = async () => {
        if (!file) return;
        setLoading(true);

        try {
            await uploadDocument(file);
            alert('File uploaded successfully');
        } catch (err) {
            alert('File upload failed');
        }
        setLoading(false);
    }

    return (
        <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <h2 className="text-white text-lg font-semibold mb-3">
                Upload PDF
            </h2>

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-white mb-3"
            />

            <button
                onClick={handleFIleUplaod}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}