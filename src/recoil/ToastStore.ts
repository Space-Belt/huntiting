import {atom} from 'recoil';

interface IToastMessage {
  isVisible: boolean;
  type: 'success' | 'fail' | 'error' | '';
  message: string;
}

const initialToastState: IToastMessage = {
  isVisible: false,
  type: '',
  message: '',
};

export const toastContent = atom<IToastMessage>({
  key: 'toastContent',
  default: initialToastState,
});
