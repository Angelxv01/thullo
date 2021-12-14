import React, { ReactChild, useImperativeHandle, useState } from 'react';
import { HtmlHTMLAttributes } from 'react';
import { Absolute, Relative } from '../common';

const Toggle = React.forwardRef(
  (
    {
      children,
      props,
    }: { children: ReactChild[]; props?: HtmlHTMLAttributes<HTMLDivElement> },
    ref
  ) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [Button, ...Child] = children;
    const toggleVisibility = () => setVisible(state => !state);
    useImperativeHandle(ref, () => ({ toggleVisibility }));

    return (
      <Relative>
        <div onClick={toggleVisibility}>{Button}</div>
        {visible && <Absolute {...props}>{Child}</Absolute>}
      </Relative>
    );
  }
);

Toggle.displayName = 'Toggle';
export default Toggle;
