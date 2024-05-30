import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ChatListComponent from '../components/List/ChatListComponent';
import ChatRoomOutModal from '../components/Modal/ChatRoomOutModal';
import ReusableHeader from '../components/ReusableHeader';
import ReusableModal from '../components/ReusableModal';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

export interface IChatRoom {
  id: number;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageCount: number;
  opponentNickname: string;
  opponentProfileImg: string;
}

const ChatList = (props: Props) => {
  const navigation = useNavigation();

  const [onDeleteModal, setOnDeleteModal] = React.useState<boolean>(false);

  const [chatRoomList, setChatRoomList] = React.useState<IChatRoom[]>([
    {
      id: 1,
      lastMessage: '저희가 필요한 제품을 공수해드릴수 있을것 같아요',
      lastMessageTime: '2024/05/27 05:11',
      lastMessageCount: 3,
      opponentNickname: '강감찬',
      opponentProfileImg: 'https://picsum.photos/200',
    },
    {
      id: 2,
      lastMessage: '제가 가지고 있는 여분의 제품이있습니다.',
      lastMessageTime: '2024/05/27 05:11',
      lastMessageCount: 3,
      opponentNickname: '정약용',
      opponentProfileImg: 'https://picsum.photos/200',
    },
    {
      id: 3,
      lastMessage: '안녕하세요! 저기에 있습니다.',
      lastMessageTime: '2024/05/27 05:11',
      lastMessageCount: 3,
      opponentNickname: '길동홍',
      opponentProfileImg: 'https://picsum.photos/200',
    },
  ]);

  const [selectedChatId, setSelectedChatId] = React.useState<number>(-1);

  const handleGotoChatRoom = (id: number) => {
    navigation.navigate('chatRoom' as never);
  };

  const onClose = (type?: string) => {
    if (type === 'exit') {
      handleDeleteBtn(selectedChatId);
    }
    setOnDeleteModal(prev => !prev);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDeleteBtn = (id: number) => {
    let tempRoom = [...chatRoomList];
    tempRoom = tempRoom.filter(el => el.id !== id);
    console.log(tempRoom);
    setChatRoomList(tempRoom);
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'채팅'} handleBackBtn={handleGoBack} />
        <ScrollView>
          {chatRoomList.map(el => (
            <ChatListComponent
              item={el}
              key={`${el.id}_${el.opponentNickname}`}
              setModalOpen={setOnDeleteModal}
              modalOpen={onDeleteModal}
              setSelectedChatId={setSelectedChatId}
              handleGotoChatRoom={handleGotoChatRoom}
              // handleDeleteBtn={handleDeleteBtn}
            />
          ))}
        </ScrollView>
        <ReusableModal
          onClose={onClose}
          visible={onDeleteModal}
          animationType="fade"
          children={<ChatRoomOutModal type={'exit'} onClose={onClose} />}
        />
      </>
    </WholeWrapper>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
