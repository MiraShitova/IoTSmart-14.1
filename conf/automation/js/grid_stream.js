rules.JSRule({
    name: "Grid Data Stream",
    triggers: [triggers.GenericCronTrigger("0/5 * * * * ?")], 
    execute: () => {
        if (items.getItem("Grid_Stability_State").state === "NULL" || items.getItem("Grid_Stability_State").state === "-") {
            items.getItem("Grid_Stability_State").postUpdate("STABLE");
        }
        if (items.getItem("Grid_Alert_Message").state === "NULL" || items.getItem("Grid_Alert_Message").state === "-") {
            items.getItem("Grid_Alert_Message").postUpdate("System Initialized");
        }
        if (items.getItem("Grid_Threshold").state === "NULL") {
            items.getItem("Grid_Threshold").postUpdate("35.0");
        }

        let total = 0;
        for (let i = 1; i <= 5; i++) {
            let status = items.getItem(`Node${i}_Status`).state;
            let p = 0;

            if (status !== "OFF") {
                p = parseFloat((Math.random() * 10 + 2).toFixed(2));
                items.getItem(`Node${i}_Voltage`).postUpdate((220 + Math.random() * 15).toFixed(1));
            }
            
            items.getItem(`Node${i}_Power`).postUpdate(p.toString());
            total += p;
        }

        items.getItem("gTotalLoad").postUpdate(total.toFixed(2));
        
        let freq = (49.8 + Math.random() * 0.4).toFixed(2);
        items.getItem("Grid_Frequency").postUpdate(freq);
    }
});