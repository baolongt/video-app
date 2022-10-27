import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import MeetingChat from "./Chat/MeetingChat.js";
import ConnectionsView from "./View/ConnectionsView.js";
import ParticipantsView from "./View/ParticipantsView.js";

function MeetingView({ onNewMeetingIdToken, onMeetingLeave }) {
	const [participantViewVisible, setParticipantViewVisible] = useState(true);

	function onParticipantJoined(participant) {
		console.log(" onParticipantJoined", participant);
	}
	function onParticipantLeft(participant) {
		console.log(" onParticipantLeft", participant);
	}
	const onSpeakerChanged = (activeSpeakerId) => {
		console.log(" onSpeakerChanged", activeSpeakerId);
	};
	function onPresenterChanged(presenterId) {
		console.log(" onPresenterChanged", presenterId);
	}
	function onMainParticipantChanged(participant) {
		console.log(" onMainParticipantChanged", participant);
	}
	function onEntryRequested(participantId, name) {
		console.log(" onEntryRequested", participantId, name);
	}
	function onEntryResponded(participantId, name) {
		console.log(" onEntryResponded", participantId, name);
	}
	function onRecordingStarted() {
		console.log(" onRecordingStarted");
	}
	function onRecordingStopped() {
		console.log(" onRecordingStopped");
	}
	function onChatMessage(data) {
		console.log(" onChatMessage", data);
	}
	function onMeetingJoined() {
		console.log("onMeetingJoined");
	}
	function onMeetingLeft() {
		console.log("onMeetingLeft");
		onMeetingLeave();
	}

	const onWebcamRequested = (data) => {
		console.log("onWebcamRequested", data);
	};
	const onMicRequested = (data) => {
		console.log("onMicRequested", data);
	};
	const onPinStateChanged = (data) => {
		console.log("onPinStateChanged", data);
	};

	const onConnectionOpen = (data) => {
		console.log("onConnectionOpen", data);
	};

	const {
		meetingId,
		leave,
		startRecording,
		stopRecording,
		toggleMic,
		toggleWebcam,
		localMicOn,
		localWebcamOn,
		localScreenShareOn,
		isRecording,
		//
		toggleScreenShare
		//
	} = useMeeting({
		onParticipantJoined,
		onParticipantLeft,
		onSpeakerChanged,
		onPresenterChanged,
		onMainParticipantChanged,
		onEntryRequested,
		onEntryResponded,
		onRecordingStarted,
		onRecordingStopped,
		onChatMessage,
		onMeetingJoined,
		onMeetingLeft,
		onWebcamRequested,
		onMicRequested,
		onPinStateChanged,
		onConnectionOpen
	});

	const handleRecording = () => {
		if (isRecording) {
			startRecording();
		}
		stopRecording();
	};

	const tollbarHeight = 120;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#212032"
			}}
		>
			<div style={{ height: tollbarHeight }}>
				<button className={"button red"} onClick={leave}>
					LEAVE
				</button>
				<button className={"button blue"} onClick={toggleMic}>
					{localMicOn ? "Disable mic" : "Enable mic"}
				</button>
				<button
					className={"button blue"}
					onClick={() => {
						toggleWebcam();
					}}
				>
					{localWebcamOn ? "Disable webcam" : "Enable webcam"}
				</button>
				<button className={"button blue"} onClick={toggleScreenShare}>
					{localScreenShareOn ? "Disable screen share" : "Enable screen share"}
				</button>
				<button className={"button blue"} onClick={handleRecording}>
					{isRecording ? "Disable screen share" : "Recording"}
				</button>
			</div>
			<h3 style={{ color: "#FFFFFF" }}>Meeting id is : {meetingId}</h3>
			<div style={{ display: "flex", flex: 1 }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						position: "relative",
						flex: 1,
						overflowY: "scroll",
						height: `calc(100vh - ${tollbarHeight}px)`
					}}
				>
					{/* <ParticipantsView /> */}
					<ParticipantsView />
				</div>
				<MeetingChat tollbarHeight={tollbarHeight} />
			</div>
		</div>
	);
}

export default MeetingView;
