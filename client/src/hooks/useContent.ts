import { useRef } from "react";

const useContent = (content = "") => {
  const valueRef = useRef<string>();
  valueRef.current = content;

  const onSave = (value: string) => (valueRef.current = value);
  const onCancel = () => valueRef.current || "";

  return { onSave, onCancel };
};

export default useContent;
