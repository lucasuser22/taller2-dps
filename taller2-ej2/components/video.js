import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideoScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState(null); // Ubicación del video
  const [annotation, setAnnotation] = useState(''); // Anotación del video
  const cameraRef = useRef(null);

  useEffect(() => {
    const setupPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && audioStatus.status === 'granted' && locationStatus.status === 'granted');
    };
    setupPermissions();
  }, []);

  const saveVideoWithLocation = async (videoUri, annotation, location) => {
    try {
      const savedVideos = await AsyncStorage.getItem('videos');
      let videoList = savedVideos ? JSON.parse(savedVideos) : [];

      // Agregar el nuevo video con su anotación y ubicación
      videoList.push({ uri: videoUri, annotation, location });

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('videos', JSON.stringify(videoList));
      Alert.alert('Video guardado con éxito', `El video se guardó con la ubicación: ${location.latitude}, ${location.longitude}`);
    } catch (error) {
      console.log('Error al guardar el video:', error);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});
        const locationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        };
        setLocation(locationData);

        // Guardar en la galería
        await MediaLibrary.saveToLibraryAsync(video.uri);

        // Guardar el video con la ubicación y la anotación en AsyncStorage
        await saveVideoWithLocation(video.uri, annotation, locationData);
        setAnnotation(''); // Limpiar la anotación después de guardar
        setIsRecording(false);
      } catch (error) {
        console.log(error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No se puede acceder a la cámara o micrófono</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <TextInput 
        style={styles.input}
        placeholder="Agregar anotación al video..."
        value={annotation}
        onChangeText={setAnnotation}
      />
      <Button
        title={isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
});
