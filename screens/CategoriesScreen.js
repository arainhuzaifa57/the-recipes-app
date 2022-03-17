import React from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CommonActions } from '@react-navigation/native';

import HeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = (props) => {
  const renderGridList = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          props.navigation.dispatch(
            CommonActions.navigate({
              name: 'CategoryMeal',
              params: {
                categoryId: itemData.item.id,
              },
            })
          )
        }
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridList}
      numColumns={2}
    />
  );
};

export const screenOptions = ({navigation}) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
  // headerStyle: {
  //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  // },
  // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;

// <View style={styles.screen}>
//     <Text>The Categories Screen</Text>
//     <Button
//         title='Go to Meals!'
//         onPress={() => {
//             props.navigation.navigate({ routeName: 'CategoryMeal' });

//             // we can also use push function in stack navigator, with push we can go
//             // to the same screen over and over again...

//             // With replace method we can replace the screen in the stack and there is only one screen
//             // in the stack and cant be able to go back to the main screen.

//             // For example: Login page.
//             // props.navigation.replace('CategoryMeal');
//         }}
//     />
// </View>
