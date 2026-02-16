# Multi-protocol IoT Gateway (OpenHAB + MQTT + Zigbee)

Даний проект реалізує **Варіант 1**: Створення мультипротокольного шлюзу на базі OpenHAB. Система об'єднує пристрої, що працюють за протоколами **MQTT** та **Zigbee**, у єдину екосистему.

## Технологічний стек
* **Docker & Docker Compose**: Контейнеризація сервісів.
* **OpenHAB 5.1**: Центральний сервер автоматизації.
* **Eclipse Mosquitto**: MQTT брокер для обміну повідомленнями.
* **MQTT Explorer**: Інструмент для емуляції датчиків та тестування.

## Реалізований функціонал
1. **Моніторинг (MQTT)**: Температура та вологість у реальному часі.
2. **Безпека (Zigbee)**: Датчик стану дверей та контроль рівня заряду батареї.
3. **Крос-протокольна автоматизація**: При відкритті дверей (Zigbee) автоматично вмикається реле (MQTT).
4. **Графічний інтерфейс**: Basic UI для візуалізації та ручного керування.

## Архітектура системи (Mermaid)

```mermaid
graph TD
    subgraph "External Devices (Emulated)"
        Z[Zigbee Door Sensor] -- "Zigbee Protocol" --> M
        T[MQTT Temp/Hum Sensor] -- "MQTT Protocol" --> M
    end

    subgraph "Docker Infrastructure"
        M[Eclipse Mosquitto Broker] <--> OH[OpenHAB 5.1 Core]
    end

    subgraph "User Interface"
        OH --> BUI[Basic UI / Sitemap]
        OH --> REST[REST API Documentation]
    end

    subgraph "Automation Logic"
        OH -- "Rules Engine" --> R[Zigbee -> MQTT Transformation]
    end