# Smart Home Edge Gateway 

## Огляд проекту
Це рішення для "розумного будинку", яке працює повністю локально. Система забезпечує обробку даних на межі (Edge Computing), що гарантує приватність, низьку затримку та працездатність навіть за відсутності інтернет-з'єднання.

## Архітектура Edge-системи


```mermaid
graph TD
    subgraph Local_Network [Локальна мережа]
        Sensors[Датчики: Рух, Температура] -->|Local Bindings/MQTT| OpenHAB[openHAB Edge Gateway]
        OpenHAB -->|Rules Engine| Decision[Автономні рішення]
        Decision -->|Command| Actuators[Виконавчі пристрої: Світло]
        OpenHAB -->|Persistence| LocalDB[(rrd4j / MapDB)]
        OpenHAB -->|UI| Dashboard[Edge Dashboard]
    end
    Cloud((Cloud)) --x |BLOCK| Local_Network
