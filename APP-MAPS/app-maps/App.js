import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import {
  requestBackgroundPermissionsAsync, //socilicta ao usuario permissao para utilizar a localização
  getCurrentPositionAsync, //quando autorizaado nos retorna a posição do usuario
  watchPositionAsync, //observa mudança na localizaçao da posição
  LocationAccuracy,
  requestForegroundPermissionsAsync
} from 'expo-location';
import { styles } from './src/styles/styles';

export default function App() {

  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  //solicita ao usuario permissao para usar a localização
  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    //caso o resultado da variavel granted seja true, a posição atual é retornada para a variavel 'currentPosition'
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition)
      //exibindo no console as informações da posição atual
      console.log(`LOCALIZAÇÃO ATUAL =>`, currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {
        /**
         * renderiza o componente caso a variavel esteja definida, ou seja, diferente de null. '&&' é um operador logico utilizado em javascript para avalização condicional
         */
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        >
          <Marker  //pegando as coordenadas atuais e colocando o simbolo encima
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />

        </MapView>
      }
    </View>
  )

}

