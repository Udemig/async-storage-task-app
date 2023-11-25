import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import CustomButton from '../components/CustomButton';
import colors from '../themes/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Status from '../constants/Status';
import {useTaskContext} from '../context/AppContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import showToast from '../utils/ToastUtils';
export default function AddTaskScreen() {
  const route = useRoute();
  const task = route?.params?.task;
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const {addTask, updateTask} = useTaskContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const handleAddTask = () => {
    console.warn('Task added!');

    const newTask = {
      id: task ? task?.id : Date.now(),
      title,
      completed: false,
      startDate: selectedStartDate?.toString(),
      endDate: selectedEndDate?.toString(),
      status: value ? value : Status.open,
    };
    if (task?.id) {
      updateTask(task?.id, newTask);
      showToast('success', 'New task edited!');
    } else {
      addTask(newTask);
    }

    navigation.navigate(ScreenName.taskList);
  };

  useLayoutEffect(() => {
    console.warn('first', task?.startDate);
    setTitle(task?.title);
    setSelectedStartDate(task ? task?.startDate : new Date()?.toISOString());
    setSelectedEndDate(task ? task?.endDate : new Date()?.toISOString());
    setValue(task?.status);

    navigation.setOptions({
      title: task?.title ? 'Task Düzenle' : 'Task Oluştur',
    });
  }, [navigation, task]);

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <View style={styles.taskImageContainer}>
          {/* Todo : Add Image */}
          {/* <LottieView
          source={require('../assets/animations/pencil.json')}
          autoPlay
          loop
          style={{height: 200, width: '100%'}}
        /> */}
        </View>
        <CustomTextInput
          label={'Task Adı'}
          imageSource={TaskNameIcon}
          onChangeText={setTitle}
          value={title}
        />
        <View style={{flexDirection: 'row'}}>
          <CustomTextInput
            style={{width: '40%'}}
            label={'Başlangıç Zamanı'}
            imageSource={TaskNameIcon}
            onChangeText={setStartDate}
            value={selectedStartDate}
            onPressIcon={() => showDatePicker()}
            isDate
          />
          <CustomTextInput
            style={{width: '40%'}}
            label={'Bitiş Zamanı'}
            imageSource={TaskNameIcon}
            onChangeText={setEndDate}
            value={selectedEndDate}
            onPressIcon={() => showDatePicker()}
            isDate
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{width: '90%'}}
              style={{borderWidth: 0}}
            />
          </View>
        </View>
      </View>
      <CustomButton
        onPress={handleAddTask}
        label={task ? 'Task Düzenle' : 'Task Oluştur'}
        style={{width: '95%'}}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="tr-TR"
        confirmTextIOS="Onayla"
        cancelTextIOS="İptal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  inlineContainer: {width: '100%'},
  taskImageContainer: {marginTop: 60},
  status: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 350,
  },
});
