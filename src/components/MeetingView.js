import { Button, Grid, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import MeetingChat from "./Chat/MeetingChat.js";
import ParticipantsView from "./View/ParticipantsView.js";
import { red } from "@material-ui/core/colors";
import {
	Mic,
	MicOff,
	Videocam,
	VideocamOff,
	PresentToAllIcon,
	CallEnd,
	PresentToAll,
	PausePresentation,
	RadioButtonChecked
} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	video: {
		borderRadius: "10px",
		backgroundColor: "#1c1c1c",
		height: "100%",
		width: "100%",
		objectFit: "cover",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},

	toggleButton: {
		borderRadius: "100%",
		minWidth: "auto",
		width: "44px",
		height: "44px"
	},

	previewBox: {
		width: "100%",
		height: "45vh",
		position: "relative"
	}
}));

function MeetingView({ onNewMeetingIdToken, onMeetingLeave }) {
	const [participantViewVisible, setParticipantViewVisible] = useState(true);
	const theme = useTheme();
	const styles = useStyles(theme);
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
		if (!isRecording) {
			startRecording();
		} else stopRecording();
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
				<Grid container alignItems="center" justify="center" spacing={2}>
					<Grid item>
						<Tooltip title={"Thoát"} arrow placement="top">
							<Button
								onClick={() => leave()}
								variant="contained"
								style={{
									backgroundColor: red[500],
									color: "white"
								}}
								className={styles.toggleButton}
							>
								{<CallEnd />}
							</Button>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip
							title={localMicOn ? "Tắt mic" : "Bật mic"}
							arrow
							placement="top"
						>
							<Button
								onClick={() => toggleMic()}
								variant="contained"
								style={
									localMicOn
										? {}
										: {
												backgroundColor: red[500],
												color: "white"
										  }
								}
								className={styles.toggleButton}
							>
								{localMicOn ? <Mic /> : <MicOff />}
							</Button>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip
							title={localWebcamOn ? "Tắt camera" : "Mở camera"}
							arrow
							placement="top"
						>
							<Button
								onClick={() => toggleWebcam()}
								variant="contained"
								style={
									localWebcamOn
										? {}
										: {
												backgroundColor: red[500],
												color: "white"
										  }
								}
								className={styles.toggleButton}
							>
								{localWebcamOn ? <Videocam /> : <VideocamOff />}
							</Button>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip
							title={localScreenShareOn ? "Ngừng chia sẻ" : "Chia sẻ màn hình"}
							arrow
							placement="top"
						>
							<Button
								onClick={() => toggleScreenShare()}
								variant="contained"
								style={
									!localScreenShareOn
										? {}
										: {
												backgroundColor: red[500],
												color: "white"
										  }
								}
								className={styles.toggleButton}
							>
								{!localScreenShareOn ? <PresentToAll /> : <PausePresentation />}
							</Button>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip
							title={!isRecording ? "Quay màn hình" : "Ngừng quay"}
							arrow
							placement="top"
						>
							<Button
								onClick={() => handleRecording()}
								variant="contained"
								style={
									!isRecording
										? {}
										: {
												backgroundColor: red[500],
												color: "white"
										  }
								}
								className={styles.toggleButton}
							>
								{<RadioButtonChecked />}
							</Button>
						</Tooltip>
					</Grid>
				</Grid>
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
