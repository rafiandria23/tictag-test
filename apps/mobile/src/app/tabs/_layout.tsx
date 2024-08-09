import type { FC } from 'react';
import { Tabs } from 'expo-router';

import { useAppSelector } from '../../hooks/store';

const TabLayout: FC = () => {
  const userState = useAppSelector((state) => state.user);

  console.log(userState.me !== null);

  if (userState.me !== null) {
    return (
      <Tabs>
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
          }}
        />
        <Tabs.Screen
          name="warranty-claims"
          options={{
            title: 'Warranty Claims',
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: 'Me',
          }}
        />
      </Tabs>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
        }}
      />
    </Tabs>
  );

  return (
    <Tabs>
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
        }}
      />
      {userState.me !== null && (
        <Tabs.Screen
          name="warranty-claims"
          options={{
            title: 'Warranty Claims',
          }}
        />
      )}
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
