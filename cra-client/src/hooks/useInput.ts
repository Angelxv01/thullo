import { useState } from 'react';

const useInput = (type: string) => {
  const [value, setValue] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return { type, value, onChange };
};

export default useInput;
