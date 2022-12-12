import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Dimensions } from "react-native"; // 화면 크기를 알 수 있음
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 원래 API KEY는 서버에 두는 것이 맞지만 이건 연습용
const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false); // 유저가 요청을 거절했을 경우
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled // page가 생김
        horizontal // 가로 스크롤
        showsHorizontalScrollIndicator={false} // 스크롤 숨기기
        //indicatorStyle="white" // 스크롤 색상, IOS만 가능
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 100 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.toDay}>
                {new Date(day.dt * 1000).toString().substring(0, 10)}
              </Text>
              <View style={styles.weatherBox}>
                <Fontisto name={icons[day.weather[0].main]} size={150} />
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    // flex: 3, 스크롤뷰는  스크린보다 커야하기 때문에 flex가 필요 없음.
    // backgroundColor: "blue",
  },
  day: {
    // flex: 1,
    // justifyContent: "center",
    width: SCREEN_WIDTH,
    alignItems: "center",
    padding: 30,
  },
  toDay: {
    fontSize: 30,
  },
  weatherBox: {
    // flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  temp: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 50,
  },
  description: {
    // marginTop: -10,
    fontSize: 40,
  },
  tinyText: {
    fontSize: 20,
  },
});
