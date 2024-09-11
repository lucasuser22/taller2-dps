import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './components/camera'; 
import VideoScreen from './components/video'; 
import MediaList from './components/mediaList'; // Importamos la lista de archivos multimedia
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function MultimediaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('CameraScreen')}
        >
          <Text style={styles.buttonText}>Fotografía</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('VideoScreen')}
        >
          <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ListaArchivosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de archivos</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
        <Text style={styles.buttonText}>Ver archivos guardados</Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#b6a3db' },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Multimedia"
        component={MultimediaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lista de archivos"
        component={ListaArchivosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="MediaList" component={MediaList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#b6a3db',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#d5db4b',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 120,
    height: 120,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
