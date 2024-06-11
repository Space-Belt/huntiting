import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useRef} from 'react';
import {
  FlatList,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChattingBottomInput from '../components/Chat/ChattingBottomInput';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {COLORS, FONTSIZE} from '../theme/theme';
import {getLayout} from '../utils/getLayout';
import ChatOut from '../assets/icons/chatroomOut.svg';
import ReusableModal from '../components/ReusableModal';
import ChatRoomOutModal from '../components/Modal/ChatRoomOutModal';
import ImageSelectWayModal from '../components/Modal/ImageSelectWayModal';
import {
  onLaunchCamera,
  onLaunchImageLibrary,
} from '../utils/cameraSelectOpener';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import CloseIcon from '../assets/icons/smallClose.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {};

interface IChat {
  message_id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  message_type: string;
  status: string;
}
interface ISectionData {
  title: string;
  data: IChat[];
}

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
  selectionLimit: 5,
};

const chats: IChat[] = [
  {
    message_id: 'message_1',
    chat_room_id: 'chat_room_1',
    sender_id: 'sender_1',
    content: '안녕하세요!!',
    timestamp: '2024/05/21 09:00',
    message_type: 'text',
    status: 'read',
  },
  {
    message_id: 'message_2',
    chat_room_id: 'chat_room_1',
    sender_id: 'sender_2',
    content: '네 안녕하세요!!',
    timestamp: '2024/05/21 09:15',
    message_type: 'text',
    status: 'unRead',
  },
];

const myId = 'sender_1';

const width = getLayout();

const ChatRoom = (props: Props) => {
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);
  const sectionListRef = useRef<SectionList>(null);

  const [nickName, setNickName] = React.useState<string>('하이룽');

  const [message, setMessage] = React.useState<string>('');

  const [selectedImages, setSelectedImages] = React.useState<Asset[]>();

  const [chatMessage, setChatMessage] = React.useState<IChat[]>([
    {
      message_id: 'message_1',
      chat_room_id: 'chat_room_1',
      sender_id: 'sender_1',
      content: '안녕하세요!!',
      timestamp: '2024/05/21 09:00',
      message_type: 'text',
      status: 'read',
    },
    {
      message_id: 'message_2',
      chat_room_id: 'chat_room_1',
      sender_id: 'sender_2',
      content: '네 안녕하세요ㅇㅇ!!',
      timestamp: '2024/05/21 09:15',
      message_type: 'text',
      status: 'unRead',
    },
  ]);

  const [sectionList, setSectionList] = React.useState<ISectionData[]>([]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [cameraModalOpen, setCameraModalOpen] = React.useState<boolean>(false);

  const renderItem = ({item}: {item: IChat}) => {
    if (item.sender_id === 'sender_1') {
      return (
        <View style={styles.myChatBox}>
          <Text style={styles.dateText}>{item.timestamp.split(' ')[1]}</Text>
          <Text style={styles.myChat}>{item.content}</Text>
        </View>
      );
    }
    return (
      <View style={styles.opponentChatBox}>
        <Text style={styles.opponentChat}>{item.content}</Text>
        <Text style={styles.dateText}>{item.timestamp.split(' ')[1]}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const deleteImage = (uri: string) => {
    let temp: Asset[] = selectedImages ? [...selectedImages] : [];
    temp = temp.filter(item => item.uri !== uri);

    setSelectedImages(temp);
  };

  const keyExtractor = (item: IChat, index: number) => {
    return `${item}-${index}`;
  };

  const sendMessage = () => {
    const today = moment().format('YYYY/MM/DD');

    const sectionIndex = sectionList.findIndex(
      section => section.title === today,
    );

    let newSections = [...sectionList];

    if (sectionIndex !== -1) {
      newSections[sectionIndex].data.push({
        message_id: `message_${newSections[sectionIndex].data.length + 1}`,
        chat_room_id: 'chat_room_1',
        sender_id: 'sender_1',
        content: message,
        timestamp: moment().format('YYYY/MM/DD hh:mm'),
        message_type: 'text',
        status: 'unRead',
      });
    } else {
      newSections.push({
        title: today,
        data: [
          {
            message_id: 'message_1',
            chat_room_id: 'chat_room_1',
            sender_id: 'sender_1',
            content: message,
            timestamp: moment().format('YYYY/MM/DD hh:mm'),
            message_type: 'text',
            status: 'unRead',
          },
        ],
      });
    }
    flatListRef.current?.scrollToEnd({animated: true});
    setSectionList(newSections);

    setMessage('');
  };

  const renderItems = ({item}: {item: Asset}) => {
    return (
      <View style={styles.imageWrapper}>
        <FastImage source={{uri: item.uri}} style={styles.addImageBtn} />
        <TouchableOpacity
          containerStyle={styles.editIconStyle}
          onPress={() => {
            if (item.uri !== undefined) {
              deleteImage(item.uri);
            }
          }}>
          <CloseIcon style={styles.editIconStyles} />
        </TouchableOpacity>
      </View>
    );
  };
  const keyExtractors = (item: any) => {
    return `${item.uri}`;
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    const temp: Asset[] = selectedImages ? [...selectedImages] : [];
    for (let i = 0; i < res.assets?.length; i++) {
      temp.push({
        ...res.assets,
        uri:
          Platform.OS === 'android'
            ? res.assets[i].uri
            : res.assets[i].uri!.replace('file://', ''),
      });
    }
    setSelectedImages(temp);
  };

  const modalClose = (type?: string) => {
    if (type === 'exit') {
      navigation.goBack();
    }
    setModalOpen(prev => !prev);
  };
  const cameraModalClose = () => {
    setCameraModalOpen(prev => !prev);
  };

  React.useEffect(() => {
    let tempDatas: ISectionData[] = [];
    let grouped: {[key: string]: IChat[]} = {};

    chats.forEach(message => {
      const date = message.timestamp.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });

    Object.keys(grouped).map(date => {
      tempDatas.push({
        title: date,
        data: grouped[date],
      });
    });

    setSectionList(tempDatas);
  }, [chats]);

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={`${nickName} 님 과의 채팅`}
          handleBackBtn={() => navigation.goBack()}
          rightBtnIcon={
            <View>
              <ChatOut style={styles.chatOutIcon} />
            </View>
          }
          handleRightBtn={() => {
            setModalOpen(true);
          }}
        />
        <SectionList
          ref={sectionListRef}
          sections={sectionList}
          renderItem={renderItem}
          style={styles.scrollContainer}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item: IChat) => `${item.chat_room_id}-${item.content}`}
        />
        {selectedImages && (
          <FlatList
            data={selectedImages}
            renderItem={renderItems}
            keyExtractor={keyExtractors}
            horizontal={true}
          />
        )}

        <ChattingBottomInput
          text={message}
          setText={setMessage}
          sendMessage={sendMessage}
          openCameraModal={() => setCameraModalOpen(prev => !prev)}
        />
        <ReusableModal
          visible={modalOpen}
          onClose={modalClose}
          animationType="slide"
          children={<ChatRoomOutModal onClose={modalClose} type={'exit'} />}
        />
        <ReusableModal
          visible={cameraModalOpen}
          onClose={cameraModalClose}
          animationType="fade"
          children={
            <ImageSelectWayModal
              onClose={cameraModalClose}
              onLaunchCamera={() =>
                onLaunchCamera(imagePickerOption as CameraOptions, onPickImage)
              }
              onLaunchImageLibrary={() =>
                onLaunchImageLibrary(
                  imagePickerOption as ImageLibraryOptions,
                  onPickImage,
                )
              }
            />
          }
        />
      </>
    </WholeWrapper>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatOutIcon: {
    alignItems: 'center',
    width: 30,
    height: 30,
    color: COLORS.Orange2,
  },

  sectionHeaderText: {textAlign: 'center', color: '#988080', marginBottom: 10},

  opponentChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  myChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  dateText: {
    alignSelf: 'flex-end',
    fontSize: FONTSIZE.size_12,
    color: '#ab8181',
    marginHorizontal: 5,
  },
  opponentChat: {
    maxWidth: width - 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 14,
    fontWeight: '600',
  },
  myChat: {
    maxWidth: width - 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: COLORS.Orange2,
    overflow: 'hidden',
    fontWeight: '600',
    color: COLORS.White,
  },
  imageContainer: {
    backgroundColor: '#3f39396e',
    justifyContent: 'center',
  },

  addImageBtn: {
    width: 90,
    height: 90,
    backgroundColor: '#eee',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  imageWrapper: {
    position: 'relative',
    paddingTop: 10,
  },
  editIconStyle: {
    position: 'absolute',
    right: 2,
    top: 0,

    zIndex: 1,
  },
  editIconStyles: {
    position: 'relative',
    zIndex: 1,
  },
});
