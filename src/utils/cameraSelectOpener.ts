import {Platform} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

export const onLaunchCamera = (
  imagePickerOption: CameraOptions,
  onPickImage: (res: any) => void,
) => {
  launchCamera(imagePickerOption, onPickImage);
};

export const onLaunchImageLibrary = (
  imagePickerOption: ImageLibraryOptions,
  onPickImage: (res: any) => void,
) => {
  launchImageLibrary(imagePickerOption, onPickImage);
};
