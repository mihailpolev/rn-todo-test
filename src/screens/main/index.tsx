import React, {useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {style} from './style';
import {Task} from '../../types/task';
import {TaskItem} from './components/item';
import Loader from '../../components/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchTasks, setPage, setDirection, setSort } from '../../store/redusers/task'
import { StackActions } from '@react-navigation/native';
import { logout } from '../../store/redusers/login'
import {RootStackParamList} from '../../../App';

const navAddAction = StackActions.push('Add');
const navLoginAction = StackActions.push('Login');

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const MainScreen: React.FC<Props> = props => {
  const {navigation} = props;
  const isLoading = useAppSelector(state => state.task.isLoading);
  const tasks = useAppSelector(state => state.task.tasks);
  const page = useAppSelector(state => state.task.page);
  const sort = useAppSelector(state => state.task.sort);
  const direction = useAppSelector(state => state.task.direction);
  const tasksCount = useAppSelector(state => state.task.count);
  const token = useAppSelector(state => state.login.token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks({ page, sort, direction }))

    navigation.setOptions({
      headerLeft: () => (
        token !== null ? (
          <Button onPress={() => dispatch(logout())} title="Logout" />
        ) : (
          <Button onPress={() => navigation.dispatch(navLoginAction)} title="Login" />
        )
      ),
      headerRight: () => (
        <Button onPress={() => navigation.dispatch(navAddAction)} title="Add" />
      ),
    });
  }, [navigation, fetchTasks, token]);

  const sorting = useCallback((payload: { sort: string, direction: string }) => {
      dispatch(setSort(payload.sort));
      dispatch(setDirection(payload.direction));
      dispatch(setPage(1));
      dispatch(fetchTasks({ page: 1, sort: payload.sort, direction: payload.direction }));
    },
    [tasksCount, sort, direction, page],
  );

  const goToPage = useCallback((newPage: number) => {
      dispatch(setPage(newPage));
      dispatch(fetchTasks({ page: newPage, sort, direction }));
    },
    [tasksCount, sort, direction, page],
  );

  const renderItem = useCallback<ListRenderItem<Task>>(
    ({item}) => {
      const {id, username, email, text, status, image_path} = item;

      return (
        <TaskItem
          key={id + username}
          username={username}
          email={email}
          text={text}
          id={id}
          status={status}
          image_path={image_path}
          isEdit={token !== null}
          onPress={() => navigation.dispatch(StackActions.push('Edit', { taskId: id }))}
        />
      );
    },
    [token],
  );

  const renderEmpty = useCallback(() => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Empty tasks</Text>
      </View>
      );
    },
    [tasksCount],
  );

  const renderSorting = useCallback(() => {
    return (
      <View style={style.sort}>
        <Text style={style.sortTitle}>Сортировка:</Text>

        <View style={style.sortBlock}>
          <TouchableOpacity onPress={() => sorting({ sort: 'id', direction: 'desc' })}>
            <Text style={[style.sortBlockLink, sort == 'id' && direction == 'desc' ? style.active : {}]}>
              ID (По убыванию)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => sorting({ sort: 'id', direction: 'asc' })}>
            <Text style={[style.sortBlockLink, sort == 'id' && direction == 'asc' ? style.active : {}]}>
              ID (По возрастанию)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.sortBlock}>
        <TouchableOpacity onPress={() => sorting({ sort: 'username', direction: 'desc' })}>
            <Text style={[style.sortBlockLink, sort == 'username' && direction == 'desc' ? style.active : {}]}>
              Имя (По убыванию)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => sorting({ sort: 'username', direction: 'asc' })}>
            <Text style={[style.sortBlockLink, sort == 'username' && direction == 'asc' ? style.active : {}]}>
              Имя (По возрастанию)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.sortBlock}>
        <TouchableOpacity onPress={() => sorting({ sort: 'email', direction: 'desc' })}>
            <Text style={[style.sortBlockLink, sort == 'email' && direction == 'desc' ? style.active : {}]}>
              E-mail (По убыванию)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => sorting({ sort: 'email', direction: 'asc' })}>
            <Text style={[style.sortBlockLink, sort == 'email' && direction == 'asc' ? style.active : {}]}>
              E-mail (По возрастанию)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.sortBlock}>
        <TouchableOpacity onPress={() => sorting({ sort: 'status', direction: 'desc' })}>
            <Text style={[style.sortBlockLink, sort == 'status' && direction == 'desc' ? style.active : {}]}>
              Статус (По убыванию)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => sorting({ sort: 'status', direction: 'asc' })}>
            <Text style={[style.sortBlockLink, sort == 'status' && direction == 'asc' ? style.active : {}]}>
              Статус (По возрастанию)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    },
    [tasksCount, sort, direction, page],
  );

  const renderPagination = useCallback(() => {
    const pageCount = Math.ceil(tasksCount / 3);

    const pagerList: number[] = [];

    if (page == 1) {
      for (let i = 1; i < 5; i++) {
        pagerList.push(i);
      }
      pagerList.push(0);
      for (let i = pageCount - 2; i <= pageCount; i++) {
        pagerList.push(i);
      }
    } else if (page == pageCount) {
      for (let i = 1; i < 4; i++) {
        pagerList.push(i);
      }
      pagerList.push(0);
      for (let i = pageCount - 3; i <= pageCount; i++) {
        pagerList.push(i);
      }
    } else if (page > 3 && page < pageCount - 3) {
      pagerList.push(1);
      pagerList.push(0);
      pagerList.push(page-2);
      pagerList.push(page-1);
      pagerList.push(page);
      pagerList.push(page+1);
      pagerList.push(page+2);
      pagerList.push(0);
      for (let i = pageCount - 1; i <= pageCount; i++) {
        pagerList.push(i);
      }
    } else if (page > pageCount - 3) {
      for (let i = 1; i < 4; i++) {
        pagerList.push(i);
      }
      pagerList.push(0);
      pagerList.push(pageCount - 3);
      for (let i = pageCount - 2; i <= pageCount; i++) {
        pagerList.push(i);
      }
    } else if (page == pageCount - 3) {
      pagerList.push(1);
      pagerList.push(0);
      pagerList.push(page-2);
      pagerList.push(page-1);
      pagerList.push(page);
      pagerList.push(page+1);
      pagerList.push(page+2);
      pagerList.push(page+3);
    } else {
      for (let i = 1; i < 5; i++) {
        pagerList.push(i);
      }
      pagerList.push(0);
      for (let i = pageCount - 2; i <= pageCount; i++) {
        pagerList.push(i);
      }
    }

    return (
      <>
        <Text style={style.tasksCount}>Task count: {tasksCount}</Text>
        <View style={style.paginator}>
          {pagerList.map(item => (
            <>{renderPagerItem(item)}</>
          ))} 
        </View>
      </>
      );
    },
    [tasksCount, sort, direction, page],
  );

  const renderPagerItem = useCallback((item: number) => {
      return (
        <>
        {
          item == 0 ? (
            <View style={style.paginatorSeparator} key={`page-${item}`}>
              <Text style={style.paginatorTitle}>...</Text>
            </View>
          ) : (
            <TouchableOpacity style={[style.paginatorItem, item == page ? style.paginatorActive : {}]} onPress={() => goToPage(item)} key={`page-${item}`}>
              <Text style={[style.paginatorTitle, item == page ? style.paginatorActiveText : {}]}>{item}</Text>
            </TouchableOpacity>
          )
        }
        </>
      );
    },
    [page, direction, sort],
  );

  const renderContent = useCallback(() => {
    if (isLoading && !tasks.length) {
      return <Loader />;
    }

    return (
      <FlatList
        data={tasks}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty()}
        ListHeaderComponent={renderSorting()}
        ListFooterComponent={renderPagination()}
      />
    );
  }, [tasks, isLoading]);

  return <View style={style.screen}>{renderContent()}</View>;
};
