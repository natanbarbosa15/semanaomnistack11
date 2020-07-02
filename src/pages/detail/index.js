import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  FlatList,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [incidents, setIncidents] = useState([route.params.incident]);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);

  const message = `Olá ${
    incidents[0].name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incidents[0].title
  }" com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(incidents[0].value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incidents[0].title}`,
      recipients: [incidents[0].email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${incidents[0].whatsapp}&text=${message}`
    );
  }

  function openGps() {
    var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    const adress =
      incidents[0].street +
      " " +
      incidents[0].streetNumber +
      ", " +
      incidents[0].neighborhood +
      ", " +
      incidents[0].city +
      " - " +
      incidents[0].state;
    var url = scheme + `?q=${adress}`;
    Linking.openURL(url);
  }

  useEffect(() => {
    async function loadMap() {
      if (loading) {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissões",
            "É necessário permitir o acesso a localização."
          );
        } else {
          const adress =
            incidents[0].street +
            " " +
            incidents[0].streetNumber +
            ", " +
            incidents[0].neighborhood +
            ", " +
            incidents[0].city +
            " - " +
            incidents[0].state;
          const coordinates = await Location.geocodeAsync(String(adress));
          const map = {
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.014,
            longitudeDelta: 0.014,
          };
          setMapCoordinates(map);
          setLoading(false);
        }
      }
    }
    loadMap();
  }, [mapCoordinates]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>

        <Image style={styles.logo} source={logoImg} />
      </View>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <>
            <View style={styles.incident}>
              <Text style={(styles.incidentProperty, { marginTop: 0 })}>
                ONG:
              </Text>
              <Text style={styles.incidentValue}>
                {incident.name} de {incident.city}/{incident.state}
              </Text>

              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}>{incident.description}</Text>

              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </Text>
            </View>

            <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Salve o dia!</Text>
              <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

              <Text style={styles.heroDescription}>Entre em contato:</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                  <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={sendMail}>
                  <Text style={styles.actionText}>Email</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.addresBox}>
              <Text style={styles.heroTitle}>Endereço</Text>
              <Text style={styles.incidentValue}>
                {incident.street} {incident.streetNumber},{" "}
                {incident.neighborhood}, {incident.city} - {incident.state}, CEP{" "}
                {incident.cep}
              </Text>
              <View style={styles.mapBox}>
                {loading ? null : (
                  <MapView
                    style={styles.mapStyle}
                    provider="google"
                    initialRegion={mapCoordinates}
                    minZoomLevel={16}
                  >
                    <Marker
                      coordinate={{
                        latitude: mapCoordinates.latitude,
                        longitude: mapCoordinates.longitude,
                      }}
                      onPress={openGps}
                    />
                  </MapView>
                )}
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
}
