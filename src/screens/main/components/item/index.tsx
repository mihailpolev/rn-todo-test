import React, {useCallback} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Task} from '../../../../types/task';
import {style} from './style';

type Props = Task & {
  isEdit: boolean,
  onPress: (
    taskId: Task['id'],
  ) => void;
};

export const TaskItem: React.FC<Props> = props => {
  const {id, username, email, text, status, image_path, isEdit, onPress} = props;

  const pressHandler = useCallback(() => {
    onPress(id);
  }, [onPress]);

  const renderItem = useCallback(() => {
      return (
        <>
          <Text style={style.number}>
            #{id}
          </Text>
          <Text style={style.userName}>
            {username}
          </Text>
          <Text style={style.email}>
            {email}
          </Text>
          {
            status == 0 && (
              <Text style={style.work}>
                Не выполнена
              </Text>
            )
          }
          {
            status == 1 && (
              <Text style={style.work}>
                Не выполнена, отредактирована админом
              </Text>
            )
          }
          {
            status == 10 && (
              <Text style={style.done}>
                Выполнена
              </Text>
            )
          }
          {
            status == 11 && (
              <Text style={style.done}>
                Выполнена, отредактирована админом
              </Text>
            )
          }
          <Text style={style.text}>
            {text}
          </Text>
        </>
      );
    },
    [id, username, email, text, status],
  );

  return (
    (
      isEdit ? (
        <TouchableOpacity style={style.container} onPress={pressHandler}>
          {renderItem()}
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          {renderItem()}
        </View>
      )
    )
  );
};
