rules.JSRule({
    name: "Edge Autonomous Decision",
    triggers: [triggers.ItemStateUpdateTrigger("Local_Motion", "ON")],
    execute: () => {
        items.getItem("Local_Light").sendCommand("ON");
        items.getItem("Edge_System_Status").postUpdate("EDGE_DECISION: LIGHT_ON");
        
        console.info("Edge Gateway: Автономна реакція на рух.");

        actions.ScriptExecution.createTimer(time.ZonedDateTime.now().plusSeconds(10), () => {
            items.getItem("Local_Light").sendCommand("OFF");
            items.getItem("Local_Motion").postUpdate("OFF");
            items.getItem("Edge_System_Status").postUpdate("OFFLINE MODE - ACTIVE");
        });
    }
});

rules.JSRule({
    name: "Edge Node Monitoring",
    triggers: [triggers.GenericCronTrigger("0/15 * * * * ?")], 
    execute: () => {
        items.getItem("Edge_CPU_Load").postUpdate((Math.random() * 10 + 2).toFixed(1));
        items.getItem("Edge_RAM_Usage").postUpdate((Math.random() * 50 + 420).toFixed(1));
        items.getItem("Local_Temperature").postUpdate((21 + Math.random() * 3).toFixed(1));

        let currentStatus = items.getItem("Edge_System_Status").state;
        if (currentStatus === "NULL" || currentStatus === "-") {
            items.getItem("Edge_System_Status").postUpdate("OFFLINE MODE - ACTIVE");
        }

        if (items.getItem("Local_Motion").state === "NULL") {
            items.getItem("Local_Motion").postUpdate("OFF");
        }
    }
});