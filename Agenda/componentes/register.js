import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from "react-native-web";
//AsyncStorage
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Para guardar en doc json
import RNFS from 'react-native-fs'

//Reforming code
const registroU = () =>{
  //Variables para guardar datos
  //[variable principal, control para useState]
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  //Variable para confirmar que se ingrese la contraseña
  const [confirmPass, setConfirmPass] = useState('');

  //Validar que se ingrese la misma contraseña
  //Esta función es llamada en el botón
  const saveData = async () =>{
    if(pass !== confirmPass){
      Alert.alert('ERROR','Las contraseñas no coinciden, ingreseles nuevamente');
      return;
    }

    //Arreglo para guardar las variables
    const userData ={name, mail, pass};

    //Save and write data in JSON
    const path = RNFS.DocumentDirectoryPath+'dataUser.json';
    const dataJSON = JSON.stringify(userData);
    

    //Función para guardar los datos
    //Si todo sale bien a la primera, se ejecuta lo primero
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Registrado', 'Los datos fueron guardados correctamente');
    //En caso de ocurrir un error
    }catch(error){
      Alert.alert('ERROR','Ocurrió ub eror, no se pudo guardar los datos');
    }
  };

  //Código de la página
  //Aquí lo explico: Se agregan en los input las propiedades value, igualado a la variable
  //y el onChange para el useState
  return(
    <View style={styles.loginContainer}>
      <View style={styles.form}>
        <Image source={require('./recursos/registro.png')} style={styles.image}/>
        <Text style={styles.label}>Ingrese su nombre de usuario</Text>
        <TextInput style={styles.input} placeholder="Nombre de usuario" value={name} onChangeText={setName} />
        <Text style={styles.label}>Ingrese su correo electrónico</Text>
        <TextInput style={styles.input} placeholder="example@mail.com" value={mail} onChangeText={setMail}/>
        <Text style={styles.label}>Ingrese su contraseña</Text>
        <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry value={pass} onChangeText={setPass}/>
        <Text style={styles.label}>Verifique su contraseña</Text>
        <TextInput style={styles.input} placeholder="Verifique su contraseña" secureTextEntry value={confirmPass} onChangeText={setConfirmPass}/>
        <Button title="Registrarse" onPress={saveData} ></Button>
        <Text style={styles.login} onPress={() => {}}>¿Ya cuenta con usuario? Ingrese aquí</Text>
      </View>
    </View>
  );
}

export default registroU;

const styles = StyleSheet.create({
  loginContainer:{flex:1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: 'white', alignItems: 'center'},
  form: {justifyContent: "center", backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3},
  label:{fontSize: 15, marginBottom: 5, fontWeight: 'bold', textAlign: 'center'},
  input:{height: 20, borderColor: 'black', borderRadius: 5, borderWidth: 1, marginBottom: 5, padding: 10},
  login: {color: 'blue', textAlign: 'center'},
  image:{ resizedMode: 'cover', width: 400, height: 200}
});
