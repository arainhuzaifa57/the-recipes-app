import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigator imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Constant Colors
import Colors from '../constants/Colors';

// Screens
import CategoriesScreen, {
  screenOptions as CategoryScreenOptions,
} from '../screens/CategoriesScreen';
import CategoryMealsScreen, {
  screenOptions as CaterogyMealOption,
} from '../screens/CategoryMealsScreen';
import MealDetailScreen, { screenOptions as MealDetailOption } from '../screens/MealDetailScreen';
import FavoriteScreen, { screenOptions as FavoriteOptions } from '../screens/FavoritesScreen';
import FiltersScreen, { screenOptions as FilterOptions } from '../screens/FiltersScreen';

// const Tab = createBottomTabNavigator();
const MaterialTab = createMaterialBottomTabNavigator();
const FavStack = createNativeStackNavigator();
const MealStack = createNativeStackNavigator();
const FilterStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavStyle = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MyNavigator = () => {
  return (
    <MealStack.Navigator screenOptions={defaultNavStyle}>
      <MealStack.Screen
        name='Meal Categories'
        component={CategoriesScreen}
        options={CategoryScreenOptions}
      />
      <MealStack.Screen
        name='CategoryMeal'
        component={CategoryMealsScreen}
        options={CaterogyMealOption}
      />
      <MealStack.Screen name='MealDetail' component={MealDetailScreen} options={MealDetailOption} />
    </MealStack.Navigator>
  );
};
const FavNavigator = () => {
  return (
    <FavStack.Navigator screenOptions={defaultNavStyle}>
      <FavStack.Screen name='Your Favorites' component={FavoriteScreen} options={FavoriteOptions} />
      <FavStack.Screen name='MealDetail' component={MealDetailScreen} options={MealDetailOption} />
    </FavStack.Navigator>
  );
};

const FilterNavigator = () => {
  return (
    <FilterStack.Navigator screenOptions={defaultNavStyle}>
      <FilterStack.Screen name='Filter Meals' component={FiltersScreen} options={FilterOptions} />
    </FilterStack.Navigator>
  );
};

const androidTabs = () => {
  return (
    <MaterialTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Meals') {
            iconName = 'ios-restaurant';
          } else if (route.name === 'Favorites') {
            iconName = 'ios-star';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarColor: Colors.primaryColor,
      })}
      activeColor='white'
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
    >
      <MaterialTab.Screen name='Meals' component={MyNavigator} />
      <MaterialTab.Screen name='Favorites' component={FavNavigator} />
    </MaterialTab.Navigator>
  );
};

const iosTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Meals') {
            iconName = 'ios-restaurant';
          } else if (route.name === 'Favorites') {
            iconName = 'ios-star';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Colors.accentColor,
      })}
    >
      <Tab.Screen name='Meals' component={MyNavigator} screenOptions={{ tabBarLabel: 'Meals!' }} />
      <Tab.Screen
        name='Favorites'
        component={FavNavigator}
        screenOptions={{ tabBarLabel: 'Favorite!' }}
      />
    </Tab.Navigator>
  );
};
const TabNavigator = () => {
  return Platform.OS === 'android' ? androidTabs() : iosTabs();
};

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: Colors.accentColor,
          drawerLabelStyle: { fontFamily: 'open-sans' },
        }}
      >
        <Drawer.Screen name='Meal Categories' component={TabNavigator} />
        <Drawer.Screen name='Filters' component={FilterNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default DrawerNavigator;
