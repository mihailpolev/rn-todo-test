import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Switch} from 'react-native';
import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack';
import {style} from './style';
import {RootStackParamList} from '../../../App';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getTaskById, fetchEditTask, updateEditTask } from '../../store/redusers/task'
import Loader from '../../components/Loader';
import FullScreenLoader from '../../components/FullScreenLoader';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export const EditScreen: React.FC<Props> = props => {
  const {route, navigation} = props;

  const isLoading = useAppSelector(state => state.task.isEditLoading);
  const task = useAppSelector(state => state.task.editedTask);
  const isError = useAppSelector(state => state.task.isEditError);
  const token = useAppSelector(state => state.login.token);

  const dispatch = useAppDispatch();

  const [text, onChangeText] = useState('');
  const [isTextValid, setTextValid] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const toggleSwitch = () => setIsDone(previousState => previousState ? previousState : !previousState);

  useEffect(() => {
    if (route.params.taskId) dispatch(getTaskById(route.params.taskId));
  }, [route, isError]);

  useEffect(() => {
    if (task != null) {
      onChangeText(task.text);
      setIsDone(task.status == 10 || task.status == 11);
    }
  }, [task]);

  const validateText = useCallback(() => {
    setTextValid(text.length > 0);
  }, [text, setTextValid]);

  const update = useCallback(() => {
    validateText();

    if(isTextValid && text.length != 0 && task !== null) {
      var params = new FormData();
      var status = 0;

      if(text !== task?.text) {
        if (isDone) {
          status = 11;
        } else {
          status = 1;
        }
      } else {
        if (isDone) {
          status = 10;
        } else {
          status = 0;
        }
      }

      params.append("text", text);
      params.append("token", token);
      params.append("status", status);

      let newTask = task;
      newTask.status = status;
      newTask.text = text;

      dispatch(updateEditTask(newTask));
      dispatch(fetchEditTask({ id: task.id, params }));
    }
  }, [text, isTextValid, isDone, task, token, validateText]);

  const renderContent = useCallback(() => {
    if (task == null) {
      return <Loader />;
    }

    return (
      <>
        <Text style={style.number}>
          #{task.id}
        </Text>
        <Text style={style.userName}>
          {task.username}
        </Text>
        <Text style={style.email}>
          {task.email}
        </Text>

        <View style={style.switch}>
          <Text style={style.switchText}>
            Задача выполнена
          </Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isDone}
          />
        </View>

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
          title="Update task"
          onPress={update}
        />
        {
          isLoading && (
            <FullScreenLoader />
          )
        }
      </>
    );
  }, [route, task, text, isDone, isLoading]);

  return <View style={style.screen}>{renderContent()}</View>;
};

export const screenOptions: NativeStackNavigationOptions = {
  title: 'Edit',
};
