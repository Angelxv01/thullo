import axios from "axios";

export const download = async (path: string) => {
  const response = await axios.post("/download", { path });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "dumb.ts");
  document.body.appendChild(link);
  link.click();
};
