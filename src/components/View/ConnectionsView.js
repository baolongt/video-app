import { useMeeting } from "@videosdk.live/react-sdk";
import { borderRadius, chunk, Title } from "../../constant.js";
import ConnectionView from "./ConnectionView.js";

const ConnectionsView = () => {
	const { connections, meetingId } = useMeeting();
	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				padding: borderRadius
			}}
		>
			<Title dark title={"Connections"} />
			{chunk([...connections.keys()]).map((k) => (
				<div style={{ display: "flex" }} key={k}>
					{k.map((l) => (
						<ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
					))}
				</div>
			))}
		</div>
	);
};

export default ConnectionsView;
