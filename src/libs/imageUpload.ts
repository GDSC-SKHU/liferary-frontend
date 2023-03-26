import axios from "axios";
const imageUpload = async (
  files: FileList,
  path: "main" | "board" | "study"
) => {
  console.log("f", files);
  const TOKEN = localStorage.getItem("accessToken");
  const formData = new FormData();
  Array.from(files).forEach((el) => {
    formData.append("images", el);
  });
  console.log(formData);
  const data = axios
    .post(`/api/image/new?path=${path}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.imagePath;
    })
    .catch((el) => console.log("el", el));

  return data;
};

export default imageUpload;
