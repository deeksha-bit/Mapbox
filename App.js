/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiZGVla3NoYW1laHRhMTI1IiwiYSI6ImNrcWV6OWE0bDBjcmMydXF1enZqMjd5MDMifQ.hFB7SI_kojKYfNQ42c62BA"
);

const App = () => {
  const [coordinates] = useState([78.9629, 20.5937]);
  const [route, setRoute] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [77.5946, 12.9716],
            [80.2707, 13.0827],
          ],
        },
      },
    ],
  });

  const [polygon, setPolygon] = useState({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [72.685547, 20.055931],
          [76.640625, 21.207458],
          [76.904297, 17.978733],
          [72.685547, 20.055931],
        ],
      ],
    },
  });
  const renderAnnotations = () => {
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[74, 27]}
      >
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: "red",
            borderRadius: 50,
            borderColor: "#fff",
            borderWidth: 3,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={4} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation coordinate={coordinates} />
          <View>{renderAnnotations()}</View>
          <MapboxGL.MarkerView id={"marker"} coordinate={[72, 23]}>
            <View>
              <View style={styles.markerContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{"Gujarat"}</Text>
                </View>
                <Image
                  source={require("./location.jpeg")}
                  style={{
                    width: 20,
                    height: 30,
                    backgroundColor: "red",
                    resizeMode: "cover",
                  }}
                />
              </View>
            </View>
          </MapboxGL.MarkerView>
          <MapboxGL.ShapeSource id="line1" shape={route}>
            <MapboxGL.LineLayer
              id="linelayer1"
              style={{ lineColor: "red", lineWidth: 5 }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource id="source" shape={polygon}>
            <MapboxGL.FillLayer
              id="fill"
              style={{ fillColor: "blue", fillOpacity: 0.7 }}
            />
            <MapboxGL.LineLayer
              id="line"
              style={{ lineColor: "red", lineWidth: 2 }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
    width: 60,
    backgroundColor: "transparent",
    height: 70,
  },
  map: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 5,
    flex: 1,
  },
  icon: {
    paddingTop: 10,
  },
});

export default App;
