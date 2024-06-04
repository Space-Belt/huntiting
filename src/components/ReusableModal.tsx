import React from 'react';
import {Modal, StyleSheet} from 'react-native';

interface IProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactElement;
  animationType: 'fade' | 'none' | 'slide';
}

const ReusableModal = ({visible, onClose, children, animationType}: IProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}>
      {children}
    </Modal>
  );
};

export default ReusableModal;

const styles = StyleSheet.create({});
