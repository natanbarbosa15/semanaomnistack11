import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, Linking, Alert } from "react-native";
import * as Location from "expo-location";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

import {
  Container,
  Header,
  ContactBox,
  HeroTitle,
  HeroDescription,
  IncidentList,
  Incident,
  IncidentProperty,
  IncidentValue,
  Actions,
  Action,
  ActionText,
  AddresBox,
  AddressText,
  MapBox,
} from "@components/styles";

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
          if (
            coordinates &&
            coordinates.length > 0 &&
            coordinates[0].latitude &&
            coordinates[0].longitude
          ) {
            const map = {
              latitude: coordinates[0].latitude,
              longitude: coordinates[0].longitude,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            };
            setMapCoordinates(map);
          }
          setLoading(false);
        }
      }
    }
    loadMap();
  }, []);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>

        <Image style={styles.logo} source={logoImg} />
      </Header>

      <IncidentList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <>
            <Incident>
              <IncidentProperty>ONG:</IncidentProperty>
              <IncidentValue>
                {incident.name} de {incident.city}/{incident.state}
              </IncidentValue>

              <IncidentProperty>Caso:</IncidentProperty>
              <IncidentValue>{incident.description}</IncidentValue>

              <IncidentProperty>Valor:</IncidentProperty>
              <IncidentValue>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </IncidentValue>
            </Incident>

            <ContactBox>
              <HeroTitle>Salve o dia!</HeroTitle>
              <HeroTitle>Seja o herói deste caso.</HeroTitle>

              <HeroDescription>Entre em contato:</HeroDescription>

              <Actions>
                <Action onPress={sendWhatsapp}>
                  <ActionText>WhatsApp</ActionText>
                </Action>
                <Action onPress={sendMail}>
                  <ActionText>Email</ActionText>
                </Action>
              </Actions>
            </ContactBox>

            <AddresBox>
              <HeroTitle>Endereço</HeroTitle>
              <AddressText>
                {incident.street} {incident.streetNumber},{" "}
                {incident.neighborhood}, {incident.city} - {incident.state}, CEP{" "}
                {incident.cep}
              </AddressText>
              <MapBox>
                {mapCoordinates ? (
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
                ) : null}
              </MapBox>
            </AddresBox>
          </>
        )}
      />
    </Container>
  );
}
