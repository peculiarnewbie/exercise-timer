import { createSignal, For, Show } from "solid-js";

export default function Main() {
    const [elapsed, setElapsed] = createSignal(0);
    const [currentSplit, setCurrentSplit] = createSignal(0);
    const [splits, setSplits] = createSignal([120, 60]);

    const [isEditing, setIsEditing] = createSignal(false);

    setInterval(() => {
        if (splits()[currentSplit()] - elapsed() < 0.1) {
            const nextSplit = (currentSplit() + 1) % splits().length;
            changeSplit(nextSplit);
            if (Notification.permission === "granted") {
                new Notification("Next split!");
            }
        } else {
            setElapsed(elapsed() + 0.1);
        }
    }, 100);

    const changeSplit = (i: number) => {
        setCurrentSplit(i);
        setElapsed(0);
    };

    const startEdit = () => {
        setIsEditing(true);
    };

    const setUseNotif = (e: boolean) => {
        if (e) requestNotificationPermission();
    };

    return (
        <div class="main">
            <input
                type="checkbox"
                id="useNotif"
                name="useNotif"
                oninput={(e) => setUseNotif(e.target.checked)}
            />
            <label for="useNotif">use notif</label>
            <h1>{(splits()[currentSplit()] - elapsed()).toFixed(1)}</h1>
            <div style={{ display: "flex" }}>
                <For each={splits()}>
                    {(split, i) => (
                        <button
                            style={`${
                                i() === currentSplit()
                                    ? "background-color: #882388"
                                    : ""
                            }`}
                            onclick={() => changeSplit(i())}
                        >
                            <p>{split}</p>
                        </button>
                    )}
                </For>
            </div>
            <Show
                when={isEditing()}
                fallback={<button onclick={startEdit}>Edit</button>}
            >
                <For each={splits()}>
                    {(split, index) => (
                        <div>
                            <input
                                type="number"
                                value={split}
                                oninput={(e) =>
                                    setSplits(
                                        splits().map((s, i) =>
                                            i === index()
                                                ? Number(e.target.value)
                                                : s
                                        )
                                    )
                                }
                            />
                        </div>
                    )}
                </For>
                <button onclick={() => setSplits(splits().concat(60))}>
                    add
                </button>
                <button onclick={() => setIsEditing(false)}>Save</button>
            </Show>
        </div>
    );
}

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        console.log("Permission already granted");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Permission granted");
            }
        });
    }
}
