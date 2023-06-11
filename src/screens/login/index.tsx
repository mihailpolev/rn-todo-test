import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack';
import {style} from './style';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchLogin, clearLoginState } from '../../store/redusers/login'
import { StackActions } from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

const backAction = StackActions.pop(1);

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = props => {
  const {navigation} = props;

  const isLoading = useAppSelector(state => state.login.isLoading);
  const token = useAppSelector(state => state.login.token);
  const isError = useAppSelector(state => state.login.isError);

  const dispatch = useAppDispatch();

  const [username, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');

  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    if (token !== null) {
      Alert.alert('Login success', '', [
        {
          text: 'Ok',
          style: 'cancel',
          onPress: () => {
            dispatch(clearLoginState());
            navigation.dispatch(backAction)
          },
        }
      ],
      {
        cancelable: true,
      });
    } 
    if (isError) {
      Alert.alert('Login error', 'Неверный логин или пароль', [{
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            dispatch(clearLoginState());
          },
        }
      ],
      {
        cancelable: true,
      });
    }
  }, [token, isError]);

  const validateUsername = useCallback(() => {
    setUsernameValid(username.length > 0);
  }, [username, setUsernameValid]);

  const validatePassword = useCallback(() => {
    setPasswordValid(password.length > 0);
  }, [password, setPasswordValid]);

  const login = useCallback(() => {
    validateUsername();
    validatePassword();
    
    const isEmpty = username.length == 0 && password.length == 0;

    if(isUsernameValid && isPasswordValid && !isEmpty) {
      var params = new FormData();
      params.append("username", username);
      params.append("password", password);

      dispatch(fetchLogin(params));
    }
  }, [username, password, isUsernameValid, isPasswordValid, validateUsername, validatePassword])

  const renderContent = useCallback(() => {
    return (
      <>
        <TextInput
          style={[style.input, isUsernameValid ? {} : style.error]}
          placeholder="Login"
          editable
          value={username}
          onChangeText={onChangeName}
          onBlur={validateUsername}
        />
        {
          !isUsernameValid && (
            <Text style={style.errorText}>Invalid login</Text>
          )
        }
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          style={[style.input, isPasswordValid ? {} : style.error]}
          secureTextEntry={true}
          onBlur={validatePassword}
        />
        {
          !isPasswordValid && (
            <Text style={style.errorText}>Invalid password</Text>
          )
        }
 
        <Button
          title="Login"
          onPress={login}
        />
        {
          isLoading && (
            <FullScreenLoader />
          )
        }
      </>
    );
  }, [username, password, isLoading, login, isUsernameValid, onChangeName, validateUsername, onChangePassword, validatePassword, isPasswordValid ]);

  return <View style={style.screen}>{renderContent()}</View>;
};

export const screenOptions: NativeStackNavigationOptions = {
  title: 'Login',
};
