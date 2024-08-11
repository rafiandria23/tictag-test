import type { FC } from 'react';
import { Tabs } from 'expo-router';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const TabLayout: FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        key="products"
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
        key="warranty-claims"
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
        key="me"
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
