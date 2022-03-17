import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/mealsAction';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({ route, navigation }) => {
  // const MealId = props.navigation.getParam('mealIds');
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const { mealIds } = route.params;
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealIds)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealIds);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealIds));
  }, [dispatch, mealIds]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  /**
   * this will send the header title to navigation options
   *
   * useEffect(() => {
   *    navigation.setParams({ mealTitle: selectedMeal.title });
   * }, [selectedMeal]);
   *
   *  OR
   *
   * you cans set the mealTitle in the meal list component
   */

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

export const screenOptions = ({ route, navigation }) => {
  const { mealTitle } = route.params;
  const { toggleFav } = route.params;
  // const toggleFavorite = navigation.setOptions({ toggleFav });
  const { isFav } = route.params;

  // const MealId = navigationData.navigation.getParam('mealIds');
  // const selectedMeal = MEALS.find((meal) => meal.id === mealIds);

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorites'
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-around',
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 2,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    color: Colors.primaryColor,
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.accentColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default MealDetailScreen;
