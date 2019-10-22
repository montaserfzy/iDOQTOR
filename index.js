/**
 * @format
 */

import bgMessaging from './src/providers/FCMBackground'; // <-- Import the file you created in (2)
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Android BACKGROUND TASK
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
