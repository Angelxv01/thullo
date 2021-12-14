import { useEffect, useRef, useState } from 'react';

export interface IUseTextArea {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  divRef: React.RefObject<HTMLDivElement>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const useTextArea = (init = ''): IUseTextArea => {
  const [value, setValue] = useState<string>(init);
  const divRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.dataset.replicatedValue = init;
    }
  }, [init]);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!(divRef.current && textAreaRef.current)) return;
    divRef.current.dataset.replicatedValue = textAreaRef.current.value;
    setValue(e.target.value);
  };
  return { value, onChange, divRef, textAreaRef };
};

export default useTextArea;
