import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = ({ route, navigation }) => {
  // This approch is work react navigatin V4.
  // const catId = props.navigation.getParams('categoryId');
  // const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  const { categoryId } = route.params;
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeal = availableMeals.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);
  if (displayedMeal.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }
  return <MealList listData={displayedMeal} navigation={navigation} />;
};

export const screenOptions = ({ route }) => {
  // console.log(navigationData)
  const { categoryId } = route.params;
  // const catId = navigationData.navigation.getParams('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealsScreen;
