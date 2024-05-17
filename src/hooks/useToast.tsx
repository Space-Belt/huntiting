import {useRecoilState} from 'recoil';
import {toastContent} from '../recoil/ToastStore';

export const useToast = () => {
  const [toastContents, setToastContents] = useRecoilState(toastContent);

  const onToast = (
    message: string,
    type: 'success' | 'fail' | 'error',
    isVisible: boolean,
  ) => {
    setToastContents({
      isVisible,
      message,
      type,
    });

    setTimeout(() => {
      setToastContents({
        message: '',
        type: '',
        isVisible: false,
      });
    }, 1500);
  };

  return {onToast};
};
