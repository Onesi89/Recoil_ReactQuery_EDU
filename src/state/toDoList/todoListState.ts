import { atom } from 'recoil';

type todoTypes = {
  id: number;
  text: string;
  isCompleted: boolean;
};
export type { todoTypes };

const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      // eslint-disable-next-line no-unused-expressions
      isReset ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const todoListState = atom<todoTypes[]>({
  key: 'todoListState',
  default: [],
  effects: [sessionStorageEffect('todoListState')],
});

export default todoListState;
