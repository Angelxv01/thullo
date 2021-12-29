import axios from "axios";
// https://gist.github.com/Tomassito/a5b4d29f459b9383dc3daa313ae5f73b
export const download = async (path: string) => {
  const response = await axios({
    url: "/download",
    method: "POST",
    responseType: "blob",
    data: { path },
  });
  const contentType = response.headers["content-type"].split(";")[0];
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: contentType })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", path);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
