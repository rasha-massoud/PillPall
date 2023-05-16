#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Kent 100";
const char* password = "PassWord";
const int buzzerPin = 8;

ESP8266WebServer server(80);

void handleBuzzRequest() {
  
  int duration = server.arg("duration").toInt();
  
  digitalWrite(buzzerPin, HIGH);
  delay(duration * 1000);
  digitalWrite(buzzerPin, LOW);

  server.send(200, "text/plain", "Buzzer activated");
}

void setup() {

  pinMode(buzzerPin, OUTPUT);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  
  server.on("/buzz", handleBuzzRequest);
  server.begin();
}

void loop() {
  server.handleClient();
}
