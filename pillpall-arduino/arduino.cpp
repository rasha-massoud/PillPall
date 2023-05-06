#include <SoftwareSerial.h>
#include <ArduinoJson.h>

SoftwareSerial bluetoothSerial(10, 11);

const int buzzerPin = 8;

void setup() {
    Serial.begin(9600);  
    bluetoothSerial.begin(9600);

    pinMode(buzzerPin, OUTPUT);
}

void loop() {
    if (bluetoothSerial.available()) {
        String jsonData = bluetoothSerial.readStringUntil('\n');
        
        Serial.print("Received JSON data: ");
        Serial.println(jsonData);
        
        StaticJsonDocument<256> doc;
        DeserializationError error = deserializeJson(doc, jsonData);
        
        if (error) {
            Serial.print("Failed to parse JSON: ");
            Serial.println(error.c_str());
            return;
        }
        
        if (doc.containsKey("medications")) {
            JsonArray medications = doc["medications"].as<JsonArray>();
            
            int currentTime = hour() * 100 + minute();
            
            for (JsonObject medication : medications) {
                String name = medication["name"].as<String>();
                int dosage = medication["dosage"].as<int>();
                int timing = medication["timing"].as<int>();
                
                if (timing == currentTime) {
                    digitalWrite(buzzerPin, HIGH);
                    delay(3000);
                    digitalWrite(buzzerPin, LOW);
                }
                
            }
        }
    }
}
