import toast from "react-hot-toast";
export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];
  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              console.log("Image uploaded successfully:", link);
              callbackFn(link);
              resolve(link);
            });
          } else {
            response.json().then((err) => {
              console.error("Upload failed:", err);
              reject(new Error(err?.error || "Upload failed"));
            });
          }
        })
        .catch((error) => {
          console.error("Upload error:", error);
          reject(error);
        });
    });
    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded!",
      error: (err) => `Upload error: ${err?.message || "Unknown error"}`,
    });
  }
}
