import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import CustomButton from '../components/CustomButton';
import colors from '../themes/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
  };

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
            value={startDate}
            onPressIcon={() => showDatePicker()}
            isDate
          />
          <CustomTextInput
            style={{width: '40%'}}
            label={'Bitiş Zamanı'}
            imageSource={TaskNameIcon}
            onChangeText={setEndDate}
            value={endDate}
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
        label="Save Task"
        style={{width: '95%'}}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
