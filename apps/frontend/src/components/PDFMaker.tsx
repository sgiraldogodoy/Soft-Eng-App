import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface Patient {
  name: string;
  age: number;
  gender: string;
  address: string;
}
export const PatientInfoPDF: React.FC<{ patient: Patient }> = ({ patient }) => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Patient Information</Text>
          <Text style={styles.text}>Name: {patient.name}</Text>
          <Text style={styles.text}>Age: {patient.age}</Text>
          <Text style={styles.text}>Gender: {patient.gender}</Text>
          <Text style={styles.text}>Address: {patient.address}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PatientInfoPDF;
