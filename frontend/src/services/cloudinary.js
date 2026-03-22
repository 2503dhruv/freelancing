export const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "freelancing_upload");
  
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlxjb5vzm/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
  
    const result = await res.json();
    return result.secure_url;
  };