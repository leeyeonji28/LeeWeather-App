import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dimensions } from "react-native"; // 화면 크기를 알 수 있음

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled // page가 생김
        horizontal // 가로 스크롤
        showsHorizontalScrollIndicator={false} // 스크롤 숨기기
        //indicatorStyle="white" // 스크롤 색상, IOS만 가능
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>30</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>30</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    // flex: 3, 스크롤뷰는  스크린보다 커야하기 때문에 flex가 필요 없음.
    backgroundColor: "blue",
  },
  day: {
    // flex: 1,
    // justifyContent: "center",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 180,
  },
  description: {
    marginTop: -10,
    fontSize: 40,
  },
});
