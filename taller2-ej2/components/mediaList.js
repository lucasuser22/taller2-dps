import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Video, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MediaList() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    // Cargar las imágenes y videos guardados de AsyncStorage
    const loadMedia = async () => {
      try {
        const savedImages = await AsyncStorage.getItem('images');
        const savedVideos = await AsyncStorage.getItem('videos');
        
        const imageList = savedImages ? JSON.parse(savedImages) : [];
        const videoList = savedVideos ? JSON.parse(savedVideos) : [];

        // Combinar las listas de imágenes y videos
        setMedia([...imageList, ...videoList]);
      } catch (error) {
        console.log('Error al cargar los medios:', error);
      }
    };
    loadMedia();
  }, []);

  return (
    <FlatList 
      data={media}
      keyExtractor={(item, index) => index.toString()}  // Usa el índice como key
      renderItem={({ item }) => (
        <View style={styles.mediaItem}>
          {item.uri.endsWith('.mp4') ? (  // Verificar si es un video
            <Video
              source={{ uri: item.uri }}
              style={styles.mediaVideo}
              useNativeControls
              resizeMode="contain"
            />
          ) : (
            <Image source={{ uri: item.uri }} style={styles.mediaImage} />
          )}
          <Text>{item.annotation || 'Sin anotaciones'}</Text>
          {item.location && (
            <Text>Ubicación: {item.location.latitude}, {item.location.longitude}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  mediaItem: { marginBottom: 20 },
  mediaImage: { width: '100%', height: 200 },
  mediaVideo: { width: '100%', height: 200 },
});
