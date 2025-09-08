import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].darker,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].darker,
          margin: 10,
          position: "absolute",
          justifyContent: "space-between",
          bottom: 40,
          paddingBottom: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].tint,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="th-list" color={color} />
          ),
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].tint,
            backgroundColor: Colors[colorScheme ?? "light"].darker,
          },
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].tint,
            backgroundColor: Colors[colorScheme ?? "light"].darker,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].tint,
            backgroundColor: Colors[colorScheme ?? "light"].darker,
          },
        }}
      />
    </Tabs>
  );
}
