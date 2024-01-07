
import Orientation from 'react-native-orientation';

const lockToPortrait = () => {
  Orientation.lockToPortrait();
};

const addOrientationListener = (callback) => {
  Orientation.addOrientationListener(callback);
};

const removeOrientationListener = (callback) => {
  Orientation.removeOrientationListener(callback);
};

export default {
  lockToPortrait,
  addOrientationListener,
  removeOrientationListener,
};
