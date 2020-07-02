import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  logo: {
    marginLeft: 16,
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
    marginTop: 24,
  },

  incidentList: {
    marginTop: 16,
  },

  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    marginTop: 24,
    fontWeight: "bold",
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: "#737380",
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },

  heroTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30,
  },

  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16,
  },

  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  addresBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },

  mapBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 16,
  },

  mapStyle: {
    alignSelf: "stretch",
    height: 300,
  },
});
