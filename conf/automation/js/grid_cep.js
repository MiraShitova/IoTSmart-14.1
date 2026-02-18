rules.JSRule({
    name: "CEP: Peak Demand & Stability Detection",
    triggers: [triggers.ItemStateUpdateTrigger("gTotalLoad")],
    execute: () => {
        const totalLoad = parseFloat(items.getItem("gTotalLoad").state);
        const threshold = parseFloat(items.getItem("Grid_Threshold").state) || 35.0;

        if (totalLoad > threshold) {
            items.getItem("Grid_Stability_State").postUpdate("УВАГА: ПЕРЕВАНТАЖЕННЯ"); 
            
            if (items.getItem("Node5_Status").state !== "OFF") {
                items.getItem("Node5_Status").sendCommand("OFF");
                items.getItem("Grid_Alert_Message").postUpdate("Вузол 5 відключено (пікове навантаження)"); 
            }
        } else {
            items.getItem("Grid_Stability_State").postUpdate("СТАБІЛЬНО");
            items.getItem("Grid_Alert_Message").postUpdate("Система в нормі");
        }
    }
});