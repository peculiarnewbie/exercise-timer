import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import TimeTick from "@/components/TimeTick";
import { useRef, useState } from "react";

export default function TabOneScreen() {
    const [initTimes, setInitTimes] = useState([10]);
    const [isRunning, setIsRunning] = useState(true);
    const [timerIndex, setTimerIndex] = useState(0);

    const togglePause = () => {
        setIsRunning((prev) => !prev);
    };

    const nextTimer = () => {
        setTimerIndex((prev) => (prev + 1) % initTimes.length);
    };

    const addTime = () => {
        setInitTimes((prev) => [...prev, 10]);
    };

    // Use a ref to track running state

    return (
        <View style={styles.container}>
            <View style={{ flex: 2 }} />
            <View style={styles.flex}>
                {initTimes.map((initTime, index) => (
                    <TimeTick
                        initTime={initTime}
                        isRunning={isRunning}
                        isActive={timerIndex === index}
                        nextTimer={nextTimer}
                    />
                ))}
            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <View style={styles.flex}>
                <Button onPress={togglePause} title="Pause" />
                <Button onPress={nextTimer} title="Skip" />
                <Button onPress={addTime} title="Add Time" />
            </View>
            <View style={{ flex: 2 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    flex: {
        flex: 0.4,
        flexDirection: "row",
        gap: 10,
    },
});
