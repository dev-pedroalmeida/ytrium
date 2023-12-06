import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Svg,
  Defs,
  RadialGradient,
  Stop,
  Rect
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTop: "10px solid #fbb42a",
    fontFamily: "Oswald",
  },
  section: {
    margin: 10,
    paddingHorizontal: "2cm",
    flexGrow: 1,
  },
  title: {
    fontSize: "3cm",
    color: "#fbb42a",
    margin: "20mm 0 10mm 0",
  },
  nome: {
    fontSize: "1.5cm",
    fontWeight: "700",
    margin: "5mm 0 5mm 0",
  },
  curso: {
    textDecoration: "underline",
  },
  row: {
    marginTop: "15mm",
  },
  instrutor: {
    fontSize: "1cm",
  },
  logo: {
    width: '30vw',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 700,
    fontSize: '1.5cm',
    color: "#fbb42a",
  }
});

const Certificate = ({
  nome = "Nome",
  curso = "Nome do curso",
  instrutor = "Nome do instrutor",
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text style={styles.title}>Certificado</Text>
          <Text>Certicamos que</Text>
          <Text style={styles.nome}>{nome}</Text>
          <Text>
            Completou o curso <Text style={styles.curso}>{curso}</Text> na
            plataforma ytrium.
          </Text>
          <Text style={styles.row}>
            Instrutor: <Text style={styles.instrutor}>{instrutor}</Text>
          </Text>
          <Text style={styles.logo}>
            ytrium
          </Text>
        </View>

        <Svg viewBox="0 0 10 10">
          <Defs>
            <RadialGradient id="myRadialGradient">
              <Stop offset="50%" stopColor="#fbb42a" />
              <Stop offset="95%" stopColor="#ffffff" />
            </RadialGradient>
          </Defs>
          <Rect x="6" y="6" width="10" height="10" fill="url('#myRadialGradient')" />
        </Svg>
      </Page>
    </Document>
  );
};

export default Certificate;
