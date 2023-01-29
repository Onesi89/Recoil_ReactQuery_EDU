import { atom } from 'recoil';

const textState = atom({
  key: 'textState',
  default: '222',
});

export default textState;
