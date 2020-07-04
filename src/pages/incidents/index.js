import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Alert } from "react-native";
import Axios from "axios";

import Api from "~/services/api";

import logoImg from "@assets/logo.png";

import {
  Header,
  HeaderText,
  HeaderTextBold,
  Container,
  Title,
  Description,
  Incident,
  IncidentProperty,
  IncidentValue,
  IncidentButton,
  IncidentButtonText,
  IncidentList,
  ErrorIncidentsBox,
  ErrorIncidentsText,
} from "@components/styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingIncidents, setLoadingIncidents] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const navigation = useNavigation();

  const cancelAxios = Axios.CancelToken.source();
  const api = Api();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    try {
      if (loadingIncidents) {
        return;
      }

      if (total > 0 && incidents.length === total) {
        return;
      }

      setLoadingIncidents(true);

      const response = await api.get("incidents", {
        params: { page },
        cancelToken: cancelAxios.token,
      });

      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers["x-total-count"]);
      setPage(page + 1);
      setErrorLoading(false);
      setLoadingIncidents(false);
      setLoadingPage(false);
    } catch (error) {
      if (Axios.isCancel(error)) {
      } else {
        if (incidents.length > 0) {
          Alert.alert(
            "Erro",
            "Erro ao carregar novos casos, verifique sua conexão."
          );
        }
        setErrorLoading(true);
        setLoadingIncidents(false);
        setLoadingPage(false);
        // throw error;
      }
    }
  }

  useEffect(() => {
    loadIncidents();

    return () => {
      cancelAxios.cancel();
    };
  }, []);

  const HeaderComponent = () => (
    <Header>
      <Image source={logoImg} />
      <HeaderText>
        Total de <HeaderTextBold>{total} casos</HeaderTextBold>.
      </HeaderText>
    </Header>
  );

  const EmptyListComponent = () => {
    return errorLoading ? (
      <ErrorIncidentsBox>
        <ErrorIncidentsText>
          Erro ao carregar os casos, verifique sua conexão.
        </ErrorIncidentsText>
      </ErrorIncidentsBox>
    ) : (
      <Incident>
        <IncidentProperty>Não há casos cadastrados.</IncidentProperty>
      </Incident>
    );
  };

  const FooterListComponent = () => {
    return errorLoading && incidents.length !== 0 ? (
      <ErrorIncidentsBox>
        <ErrorIncidentsText>
          Erro ao carregar os casos, verifique sua conexão.
        </ErrorIncidentsText>
      </ErrorIncidentsBox>
    ) : null;
  };

  return (
    <Container>
      <HeaderComponent />

      <Title>Casos</Title>
      <Description>Escolha um dos casos abaixo e salve o dia</Description>
      <IncidentList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        refreshing={loadingIncidents}
        onRefresh={async () => await loadIncidents()}
        ListEmptyComponent={EmptyListComponent}
        ListFooterComponent={FooterListComponent}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.1}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>Caso:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>Valor:</IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </IncidentValue>

            <IncidentButton onPress={() => navigateToDetail(incident)}>
              <IncidentButtonText>Ver mais detalhes</IncidentButtonText>
              <Feather name="arrow-right" size={17} color="#E02041" />
            </IncidentButton>
          </Incident>
        )}
      />
    </Container>
  );
}
