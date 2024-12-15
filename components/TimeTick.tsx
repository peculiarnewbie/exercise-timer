import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Text, View } from "./Themed";
import { Button, GestureResponderEvent } from "react-native";

export default function TimeTick(props: { initTime: number }) {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(true);

	const intervalRef = useRef(null) as MutableRefObject<NodeJS.Timeout | null>;

	const togglePause = () => {
		console.log(isRunning);
		setIsRunning((prev) => !prev);
		isRunningRef.current = !isRunningRef.current;
	};

	// Use a ref to track running state
	const isRunningRef = useRef(isRunning);

	useEffect(() => {
		console.log("effect");
		intervalRef.current = setInterval(() => {
			if (!isRunningRef.current) return;
			setElapsedTime((prevCount) => prevCount + 0.1);
		}, 100);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<View>
			<Text>{(props.initTime - elapsedTime).toFixed(0)}</Text>
			<Button onPress={togglePause} title="Pause" />
		</View>
	);
}
