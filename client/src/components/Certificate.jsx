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
  Rect,
  Image,
  Path,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    borderTop: "10px solid #fbb42a",
    fontFamily: "Oswald",
    paddingHorizontal: '2cm',
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "50px",
    marginTop: ".5cm",
  },
  logo: {
    height: "100%",
    width: "4cm",
    flexGrow: 0,
  },
  gradient: {
    position: "absolute",
    right: 0,
    bottom: 0,
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
        <View style={styles.flex}>
          <Svg
            // width={369}
            // height={101}
            style={styles.logo}
            viewBox="0 0 369 101"
            fill="none"
          >
            <Path
              d="M27.382 25.9094L58.3043 5.00004"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M11.1844 90.699L38.8673 95.9999"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M5 30.6213L11.1845 90.699"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M5 30.6213L27.3819 25.9094"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M58.3042 6.47253L11.1845 90.6991"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M39.7509 39.4563H76.5632"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M63.8997 83.6311L39.7508 39.4563"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M88.6376 90.699L76.5631 39.4563"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M86.8706 89.2266L21.1975 73.6181"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M88.6376 90.699L38.8673 95.9999"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M76.5631 39.4563L58.3042 4.99999"
              stroke="#F59E0B"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M133.9 60.8501L145 32.9501H159.9L131.7 94.8001H116.5L126 74.0001L108.85 32.9501H124L133.9 60.8501ZM155.165 32.9501H162.165V16.1001H177.215V32.9501H186.415V45.4501H177.215V56.9001C177.215 58.6001 177.465 59.9835 177.965 61.0501C178.465 62.0835 179.382 62.6001 180.715 62.6001C181.615 62.6001 182.382 62.4001 183.015 62.0001C183.648 61.6001 184.032 61.3335 184.165 61.2001L189.365 72.0001C189.132 72.2001 188.398 72.5668 187.165 73.1001C185.965 73.6335 184.432 74.1168 182.565 74.5501C180.698 74.9835 178.615 75.2001 176.315 75.2001C172.215 75.2001 168.832 74.0501 166.165 71.7501C163.498 69.4168 162.165 65.8335 162.165 61.0001V45.4501H155.165V32.9501ZM202.893 74.0001H187.693V32.9501H202.893V39.3001H202.643C202.91 38.5335 203.56 37.5668 204.593 36.4001C205.626 35.2001 207.076 34.1335 208.943 33.2001C210.81 32.2335 213.093 31.7501 215.793 31.7501C217.693 31.7501 219.443 32.0501 221.043 32.6501C222.643 33.2168 223.81 33.7668 224.543 34.3001L218.643 46.6501C218.176 46.0835 217.343 45.5001 216.143 44.9001C214.976 44.2668 213.51 43.9501 211.743 43.9501C209.71 43.9501 208.026 44.4668 206.693 45.5001C205.393 46.5335 204.426 47.7835 203.793 49.2501C203.193 50.7168 202.893 52.1001 202.893 53.4001V74.0001ZM223.141 74.0001V32.9501H238.341V74.0001H223.141ZM230.941 24.5001C228.541 24.5001 226.508 23.6668 224.841 22.0001C223.175 20.3001 222.341 18.2835 222.341 15.9501C222.341 13.6168 223.175 11.6001 224.841 9.90012C226.541 8.16678 228.575 7.30012 230.941 7.30012C232.508 7.30012 233.941 7.70012 235.241 8.50012C236.541 9.26679 237.591 10.3001 238.391 11.6001C239.191 12.9001 239.591 14.3501 239.591 15.9501C239.591 18.2835 238.741 20.3001 237.041 22.0001C235.341 23.6668 233.308 24.5001 230.941 24.5001ZM257.213 51.9501C257.213 55.2168 257.83 57.8335 259.063 59.8001C260.297 61.7335 262.363 62.7001 265.263 62.7001C268.23 62.7001 270.313 61.7335 271.513 59.8001C272.747 57.8335 273.363 55.2168 273.363 51.9501V32.9501H288.363V53.5501C288.363 57.9501 287.447 61.7835 285.613 65.0501C283.813 68.2835 281.197 70.7835 277.763 72.5501C274.33 74.3168 270.163 75.2001 265.263 75.2001C260.397 75.2001 256.247 74.3168 252.813 72.5501C249.38 70.7835 246.763 68.2835 244.963 65.0501C243.163 61.7835 242.263 57.9501 242.263 53.5501V32.9501H257.213V51.9501ZM348.048 31.7501C351.148 31.7501 353.882 32.4001 356.248 33.7001C358.615 34.9668 360.465 36.9335 361.798 39.6001C363.165 42.2668 363.848 45.7001 363.848 49.9001V74.0001H348.898V52.2001C348.898 49.3335 348.465 47.0168 347.598 45.2501C346.732 43.4835 345.015 42.6001 342.448 42.6001C340.915 42.6001 339.565 43.0001 338.398 43.8001C337.232 44.6001 336.332 45.7168 335.698 47.1501C335.065 48.5501 334.748 50.2335 334.748 52.2001V74.0001H320.798V52.2001C320.798 49.3335 320.315 47.0168 319.348 45.2501C318.415 43.4835 316.748 42.6001 314.348 42.6001C312.815 42.6001 311.465 43.0001 310.298 43.8001C309.132 44.5668 308.232 45.6668 307.598 47.1001C306.998 48.5001 306.698 50.2001 306.698 52.2001V74.0001H291.598V32.9501H306.698V38.8001C307.098 37.7668 307.965 36.7168 309.298 35.6501C310.665 34.5501 312.348 33.6335 314.348 32.9001C316.348 32.1335 318.465 31.7501 320.698 31.7501C323.132 31.7501 325.165 32.1168 326.798 32.8501C328.432 33.5501 329.765 34.5001 330.798 35.7001C331.865 36.9001 332.715 38.2001 333.348 39.6001C333.815 38.4001 334.732 37.2001 336.098 36.0001C337.498 34.7668 339.232 33.7501 341.298 32.9501C343.398 32.1501 345.648 31.7501 348.048 31.7501Z"
              fill="black"
            />
          </Svg>
        </View>

        <Text style={{fontSize: 90, color: '#fbb42a'}}>Certificado</Text>
        
        <Text style={{marginTop: 10}}>Certicamos que</Text>

        <Text style={{marginTop: 5, fontSize: 50, color: '#fbb42a'}}>{nome}</Text>

        <Text style={{marginTop: 10}}>
          Completou o curso <Text style={{textDecoration: 'underline'}}>{curso}</Text> na
          plataforma ytrium.
        </Text>

        <Text style={{marginTop: 20}}>
          Instrutor: <Text style={{fontSize: 35}}>{instrutor}</Text>
        </Text>

        <Svg style={styles.gradient} viewBox="0 0 10 10">
          <Defs>
            <RadialGradient id="myRadialGradient">
              <Stop offset="50%" stopColor="#fbb42a" />
              <Stop offset="95%" stopColor="#ffffff" />
            </RadialGradient>
          </Defs>
          <Rect
            x="6"
            y="6"
            width="10"
            height="10"
            fill="url('#myRadialGradient')"
          />
        </Svg>
      </Page>
    </Document>
  );
};

export default Certificate;
