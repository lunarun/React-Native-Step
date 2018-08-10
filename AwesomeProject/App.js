import { createStackNavigator } from 'react-navigation';

import List from './src/pages/list';
import Detail from './src/pages/Detail';

const App = createStackNavigator({
  List: { screen: List },
  Detail: { screen: Detail },
}, {
  headerMode: 'screen'
});

export default App;