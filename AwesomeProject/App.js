import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import List from './src/pages/list';
import Detail from './src/pages/Detail';
import Cinemas from './src/pages/Cinemas';
import MyMovies from './src/pages/MyMovies';

const TabNavigator = createBottomTabNavigator({
  List: {screen: List},
  Cinemas: {screen: Cinemas},
  MyMovies: {screen: MyMovies},
}, {
  tabBarOptions: {
    activeTintColor: '#0390EB',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontSize: 20,
      marginBottom: 10,
    },
    style: {
      backgroundColor: '#222'
    }
  },
  navigationOptions: ({ navigation }) => {
  },
});

const App = createStackNavigator({
  TabNavigator: { 
    screen: TabNavigator,
    navigationOptions: () => ({
      header: null
    })
  },
  Detail: { screen: Detail },
}, {
  headerMode: 'screen'
});


export default App;