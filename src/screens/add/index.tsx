import React, {useCallback, useState, useEffect} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack';
import {style} from './style';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchCreateTask, clearCreateState } from '../../store/redusers/create'
import { addTask } from '../../store/redusers/task'
import { StackActions } from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

const backAction = StackActions.pop(1);

type Props = NativeStackScreenProps<RootStackParamList, 'Add'>;

export const AddScreen: React.FC<Props> = props => {
  const {navigation} = props;

  const isLoading = useAppSelector(state => state.create.isLoading);
  const task = useAppSelector(state => state.create.task);
  const isError = useAppSelector(state => state.create.isError);

  const dispatch = useAppDispatch();

  const [username, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [text, onChangeText] = useState('');

  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isTextValid, setTextValid] = useState(true);

  useEffect(() => {
    if (task !== null) {
      Alert.alert('Add task success', `Task #${task.id}`, [
        {
          text: 'Ok',
          style: 'cancel',
          onPress: () => {
            dispatch(clearCreateState());
            dispatch(addTask(task));
            navigation.dispatch(backAction)
          },
        }
      ],
      {
        cancelable: true,
      });
    } 
    if (isError) {
      Alert.alert('Add task error', 'error!!!!', [{
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            dispatch(clearCreateState());
          },
        }
      ],
      {
        cancelable: true,
      });
    }
  }, [task, isError]);

  const validateUsername = useCallback(() => {
    setUsernameValid(username.length > 0);
  }, [username, setUsernameValid]);

  const validateEmail = useCallback(() => {
    const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    setEmailValid(emailRegex.test(email) && email.length > 0);
  }, [email, setEmailValid]);

  const validateText = useCallback(() => {
    setTextValid(text.length > 0);
  }, [text, setTextValid]);

  const create = useCallback(() => {
    validateUsername();
    validateEmail();
    validateText();

    const isEmpty = username.length == 0 && email.length == 0 && text.length == 0;

    if(isUsernameValid && isEmailValid && isTextValid && !isEmpty) {
      var params = new FormData();
      params.append("username", username);
      params.append("email", email);
      params.append("text", text);

      dispatch(fetchCreateTask(params));
    }
  }, [username, email, text, isUsernameValid, isEmailValid, isTextValid, validateUsername, validateEmail, validateText])

  const renderContent = useCallback(() => {
    return (
      <>
        <TextInput
          style={[style.input, isUsernameValid ? {} : style.error]}
          placeholder="User name"
          editable
          value={username}
          onChangeText={onChangeName}
          onBlur={validateUsername}
        />
        {
          !isUsernameValid && (
            <Text style={style.errorText}>Invalid username</Text>
          )
        }
        <TextInput
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          style={[style.input, isEmailValid ? {} : style.error]}
          onBlur={validateEmail}
        />
        {
          !isEmailValid && (
            <Text style={style.errorText}>Invalid E-mail</Text>
          )
        }
        <TextInput
          editable
          multiline
          numberOfLines={3}
          maxLength={400}
          onChangeText={onChangeText}
          value={text}
          style={[style.textarea, isTextValid ? {} : style.error]}
          placeholder="Message"
          onBlur={validateText}
        />
        {
          !isTextValid && (
            <Text style={style.errorText}>Invalid message</Text>
          )
        }

        <Button
          title="Create task"
          onPress={create}
        />
        {
          isLoading && (
            <FullScreenLoader />
          )
        }
      </>
    );
  }, [username, email, text, isLoading, isUsernameValid, isEmailValid, isTextValid])

  return <View style={style.screen}>{renderContent()}</View>;
};

export const screenOptions: NativeStackNavigationOptions = {
  title: 'Add',
};
