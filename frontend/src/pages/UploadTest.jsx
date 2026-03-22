import { useState } from "react";
import { uploadImage } from "../services/cloudinary";

export default function UploadTest() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      setImage(url);
    } catch (err) {
      setError("Upload failed. Check console for details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Image Upload Test
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-500 file:text-slate-900 file:font-medium file:cursor-pointer hover:file:bg-amber-400"
      />

      {loading && <p className="mt-2 text-amber-400">Uploading...</p>}
      {error && <p className="mt-2 text-red-400">{error}</p>}

      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Upload preview"
            className="h-40 object-cover rounded border border-slate-600"
          />
          <p className="mt-2 text-sm text-slate-400 break-all">
            {image}
          </p>
        </div>
      )}
    </div>
  );
}
