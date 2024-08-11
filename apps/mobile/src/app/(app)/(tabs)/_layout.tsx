import type { FC } from 'react';
import { Tabs } from 'expo-router';

const TabLayout: FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        key="products"
        name="products"
        options={{
          title: 'Products',
        }}
      />
      <Tabs.Screen
        key="warranty-claims"
        name="warranty-claims"
        options={{
          title: 'Warranty Claims',
        }}
      />
      <Tabs.Screen
        key="me"
        name="me"
        options={{
          title: 'Me',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
