import { useMeeting } from "@videosdk.live/react-sdk";
import { borderRadius, chunk, Title } from "../../constant.js";
import ParticipantView from "./ParticipantView.js";

const ParticipantsView = () => {
	const { participants } = useMeeting();

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				padding: borderRadius
			}}
		>
			<Title dark title={"Participants"} />
			{chunk([...participants.keys()]).map((k) => (
				<div style={{ display: "flex" }}>
					{k.map((l) => (
						<ParticipantView key={l} participantId={l} />
					))}
				</div>
			))}
		</div>
	);
};

export default ParticipantsView;
