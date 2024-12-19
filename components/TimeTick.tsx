import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Text, View } from "./Themed";
import { Button, GestureResponderEvent } from "react-native";

export default function TimeTick(props: {
    initTime: number;
    isRunning: boolean;
    isActive: boolean;
    nextTimer: () => void;
}) {
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalRef = useRef(null) as MutableRefObject<NodeJS.Timeout | null>;

    const isRunningRef = useRef(props.isRunning);

    useEffect(() => {
        isRunningRef.current = props.isRunning;
    }, [props.isRunning]);

    useEffect(() => {
        if (props.isActive) {
            intervalRef.current = setInterval(() => {
                if (!isRunningRef.current) return;
                setElapsedTime((prevCount) => prevCount + 0.1);
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setElapsedTime(0);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [props.isActive]);

    useEffect(() => {
        if (elapsedTime > props.initTime) {
            props.nextTimer();
        }
    }, [elapsedTime]);

    return (
        <View>
            <Text style={{ fontSize: 40 }}>
                {(props.initTime - elapsedTime).toFixed(0)}
            </Text>
        </View>
    );
}
