import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

// const defaultNavStyle = {
//   headerStyle: {
//     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
//   },
//   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
// };
// const MealsNavigator = createStackNavigator(
//   {
//     // routeName:  KeyValuePair
//     Categories: {
//       screen: CategoriesScreen,
//       // we can also use navigationOptions here
//       // and if we set the haderTitle here then ii will override the headerTitle
//       // that is set in the component and stackNavigator is always wins...!
//       // navigationOptions: {
//       //     headerTitle: 'Huzaifa',
//       // },
//     },
//     CategoryMeal: {
//       screen: CategoryMealsScreen,
//     },
//     MealDetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavStyle,
//   }
// );

// const FavNavigator = createStackNavigator(
//   {
//     Favorites: FavoritesScreen,
//     MealDetail: MealDetailScreen,
//   },
//   { defaultNavigationOptions: defaultNavStyle }
// );

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
      },
      // tabBarColor is only work with shifting.
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
    },
  },
};

const MealsFavTabsNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        // shifting is only work when you set tabBarColor.
        shifting: true,
        // We add barStyle property when we want to add background color for tabs.
        // barStyle: {
        //   backgroundColor: Colors.primaryColor,
        // },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: MealsFavTabsNavigator,
  Filters: FiltersNavigator,
});

export default createAppContainer(MealsFavTabsNavigator);
