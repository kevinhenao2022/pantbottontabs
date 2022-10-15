import { StyleSheet, Text, Button, View, TextInput, Picker, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

function UserScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if (email == "tv@gmail.com") {
      setEmail("");
      setFullname("")
      navigation.navigate('Profile', { fullname: fullname })
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputs}
	placeholder="Nombre Completo"
        onChangeText={value => setFullname(value)}
        value={fullname}
      />
      <TextInput
        style={styles.inputs}
	placeholder="Correo Electrónico"
        onChangeText={value => setEmail(value)}
        value={email}
      />
      <Button
        title="Perfil del Usuario"
        //onPress={() => navigation.navigate('Settings')}
        //onPress={validate}
        onPress={() => {
          if (email == "tv@gmail.com") {
            setEmail("");
            setFullname("")
            navigation.navigate('Profile', { fullname: fullname })
          }
        }}

      />
    </View>
  );
}

function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.fullname}</Text>
    </View>
  );
}

function AccountScreen() {
  const [Accounttype, setAccounttype] = useState('saccount')
  const [isFourth, setIsfourth] = useState(false)
  const toggleSwitch = () => setIsfourth(isActive => !isActive);
  return (
    <View style={styles.container}>
      <Text>Cuentas</Text>
      <Picker
        selectedValue={Accounttype}
        style={{ height: 30, width: 150, borderRadius:10, marginBottom:20 }}
        onValueChange={(itemValue, itemIndex) => setAccounttype(itemValue)}
      >
        <Picker.Item label="Seleccion Tipo de Cuenta" value="" />
        <Picker.Item label="Cuenta de Ahorros" value="saccount" />
        <Picker.Item label="Cuenta Corriente" value="caccount" />
        <Picker.Item label="Tarjeta de Credito" value="dcart" />
      </Picker>

      <View style={{flexDirection:'row', marginBottom:20}} >
        <Text>Excenta 4 x mil</Text>
        <Switch
        trackColor={{ false: "orange", true: "blue" }}
        style={{marginLeft:50}}
        //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isFourth}
      />
      </View>

      <Button title='Chequear' onPress={()=>{
        alert(`tipo de cuenta: $ {Accounttype}, Exenta:${isFourth}`)
      }}/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen name="User" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  }
});
