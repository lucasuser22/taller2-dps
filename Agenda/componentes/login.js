import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native-web";
//Para navegación web <>
import { useNavigation } from "@react-navigation/native";

const Login = () => {

    //Funcion para navegar
    const manageScreen = () =>{
        
    }
    return(
        //The main container->login container->elements of the login
    <View style={styles.loginContainer}>
    <View style={styles.form}>
      <Image source={require('./recursos/agenda.png')} style={styles.image}/>
      <Text style={styles.label}>Usuario</Text>
      <TextInput style={styles.input} placeholder="Ingrese su usuario" />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry />
      <Button title="Ingresar" onPress={() => {}} ></Button>
      <Text style={styles.register} onPress={() => {}}>¿No cuenta con usuario? Regístrese aquí</Text>
    </View>
  </View>
    );
}


export default function App(){
  return(
    //The main container->login container->elements of the login
    <View style={styles.loginContainer}>
      <View style={styles.form}>
        <Image source={require('./recursos/agenda.png')} style={styles.image}/>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} placeholder="Ingrese su usuario" />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry />
        <Button title="Ingresar" onPress={() => {}} ></Button>
        <Text style={styles.register} onPress={() => {}}>¿No cuenta con usuario? Regístrese aquí</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer:{flex:1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: 'white', alignItems: 'center'},
  form: {justifyContent: "center", backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3},
  label:{fontSize: 15, marginBottom: 5, fontWeight: 'bold', textAlign: 'center'},
  input:{height: 20, borderColor: 'black', borderRadius: 5, borderWidth: 1, marginBottom: 5, padding: 10},
  register: {color: 'blue', textAlign: 'center'},
  image:{ resizedMode: 'cover'}
});
