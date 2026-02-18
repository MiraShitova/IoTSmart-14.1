rules.JSRule({
    name: "Emergency Control Handler",
    triggers: [
        triggers.ItemCommandTrigger("Emergency_Shutdown", "ON"),
        triggers.ItemCommandTrigger("Emergency_Shutdown", "OFF")
    ],
    execute: (event) => {
        const command = event.receivedCommand.toString();

        if (command === "ON") {
            console.error("!!! EMERGENCY SHUTDOWN !!!");
            for (let i = 1; i <= 5; i++) {
                items.getItem(`Node${i}_Status`).sendCommand("OFF");
            }
            items.getItem("Grid_Alert_Message").postUpdate("EMERGENCY SHUTDOWN");
            items.getItem("Grid_Stability_State").postUpdate("CRITICAL");
        } 
        else if (command === "OFF") {
            console.info("--- RECOVERY STARTING ---");
            for (let i = 1; i <= 5; i++) {
                items.getItem(`Node${i}_Status`).sendCommand("ON");
            }
            items.getItem("Grid_Alert_Message").postUpdate("System Recovered");
            items.getItem("Grid_Stability_State").postUpdate("STABLE");
            items.getItem("Emergency_Shutdown").postUpdate("OFF");
        }
    }
});