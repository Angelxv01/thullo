import {useState} from 'react';

const useVisibility = (value = false) => {
  const [visibility, setVisibility] = useState<boolean>(value);

  const toggleVisibility = () => setVisibility(!visibility);

  return [visibility, toggleVisibility] as const;
};

export default useVisibility;
