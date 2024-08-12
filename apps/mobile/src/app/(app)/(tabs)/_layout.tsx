import type { FC } from 'react';
import { Tabs } from 'expo-router';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const TabLayout: FC = () => {
  return (
    <Tabs
      tabBar={({ state, descriptors, navigation, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label as string;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name={focused ? 'shopping' : 'shopping-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="warranty-claims"
        options={{
          title: 'Warranty Claims',
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name={focused ? 'note' : 'note-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name={focused ? 'account-circle' : 'account-circle-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
