/* eslint-disable no-console */
const info = (...args: [unknown]): void => console.log(args);
const error = (...args: [unknown]): void => console.error(args);

export default { info, error };
