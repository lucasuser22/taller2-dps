import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [images, setImages] = useState([]);
  const [annotation, setAnnotation] = useState('');  // Anotación de la imagen
  const [location, setLocation] = useState(null);  // Ubicación
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasCameraPermission(status === 'granted' && locationStatus.status === 'granted');
    })();
  }, []);

  const saveImageWithAnnotation = async (imageUri, annotation, location) => {
    try {
      const savedImages = await AsyncStorage.getItem('images');
      let imageList = savedImages ? JSON.parse(savedImages) : [];

      // Agregar la nueva imagen con su anotación y ubicación
      imageList.push({ uri: imageUri, annotation, location });

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('images', JSON.stringify(imageList));
      Alert.alert('Imagen guardada con éxito', 'La imagen se guardó con su anotación y ubicación.');
    } catch (error) {
      console.log('Error al guardar la imagen:', error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});
        const locationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        };
        setLocation(locationData);

        // Guardar en la galería
        const asset = await MediaLibrary.createAssetAsync(data.uri);

        // Guardar la anotación junto con la URI de la imagen y ubicación en AsyncStorage
        await saveImageWithAnnotation(asset.uri, annotation, locationData);
        setAnnotation(''); // Limpiar la anotación después de guardar

        setImages([...images, { uri: data.uri, annotation, location: locationData }]); // Mantener la imagen en el estado temporal
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={flash}>
        <View style={styles.cameraControls}>
          <TouchableOpacity
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}
          >
            <Text style={styles.controlText}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )
            }
          >
            <Text style={styles.controlText}>{flash === Camera.Constants.FlashMode.off ? '⚡' : '💡'}</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TextInput 
        style={styles.input}
        placeholder="Agregar anotación..."
        value={annotation}
        onChangeText={setAnnotation}
      />

      <ScrollView style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Text style={styles.cardText}>Foto {index + 1}</Text>
            <Text>{image.annotation}</Text>
            {image.location && (
              <Text>Ubicación: {image.location.latitude}, {image.location.longitude}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <Button title="Tomar Foto" onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  controlText: {
    fontSize: 24,
  },
  imageContainer: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardText: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  controls: {
    padding: 20,
  },
});
