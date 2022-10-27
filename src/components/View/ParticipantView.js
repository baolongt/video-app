import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { getToken } from "../../api.js";
import { borderRadius, primary, width } from "../../constant.js";

const ParticipantView = ({ participantId }) => {
	const webcamRef = useRef(null);
	const micRef = useRef(null);
	const screenShareRef = useRef(null);

	const onStreamEnabled = (stream) => {};
	const onStreamDisabled = (stream) => {};

	const {
		displayName,
		participant,
		webcamStream,
		micStream,
		screenShareStream,
		webcamOn,
		micOn,
		screenShareOn,
		isLocal,
		isActiveSpeaker,
		isMainParticipant,
		switchTo,
		pinState,
		setQuality,
		setViewPort,
		enableMic,
		disableMic,
		enableWebcam,
		disableWebcam,
		pin,
		unpin
	} = useParticipant(participantId, {
		onStreamEnabled,
		onStreamDisabled
	});

	useEffect(() => {
		webcamOn && setQuality("high");
	}, [webcamStream, webcamOn]);

	const webcamMediaStream = useMemo(() => {
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(webcamStream.track);
			return mediaStream;
		}
	}, [webcamStream, webcamOn]);

	const screenShareMediaStream = useMemo(() => {
		if (screenShareOn) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(screenShareStream.track);
			return mediaStream;
		}
	}, [screenShareStream, screenShareOn]);

	useEffect(() => {
		if (micRef.current) {
			if (micOn && micStream) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(micStream.track);

				micRef.current.srcObject = mediaStream;
				micRef.current
					.play()
					.catch((error) => console.error("mic  play() failed", error));
			} else {
				micRef.current.srcObject = null;
			}
		}
	}, [micStream, micOn]);

	return (
		<div
			style={{
				width: width,
				backgroundColor: primary,
				borderRadius: borderRadius,
				overflow: "hidden",
				margin: borderRadius,
				padding: borderRadius,
				display: "flex",
				flex: 1,
				flexDirection: "column",
				position: "relative"
			}}
		>
			<audio ref={micRef} autoPlay muted={isLocal} />

			<div
				style={{
					position: "relative",
					borderRadius: borderRadius,
					overflow: "hidden",
					backgroundColor: "black",
					width: "100%",
					height: 300
				}}
			>
				<div
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
				>
					<>
						<ReactPlayer
							ref={webcamRef}
							//
							playsinline // very very imp prop
							playIcon={<></>}
							//
							pip={false}
							light={false}
							controls={false}
							muted={true}
							playing={true}
							//
							url={webcamMediaStream}
							//
							height={"100%"}
							width={"100%"}
							onError={(err) => {
								console.log(err, "participant video error");
							}}
						/>
					</>
				</div>
			</div>
			{screenShareOn ? (
				<div
					style={{
						marginTop: borderRadius,
						position: "relative",
						borderRadius: borderRadius,
						overflow: "hidden",
						backgroundColor: "black",
						width: "100%",
						height: 300
					}}
				>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0
						}}
					>
						<>
							<ReactPlayer
								ref={screenShareRef}
								//
								playsinline // very very imp prop
								playIcon={<></>}
								//
								pip={false}
								light={false}
								controls={false}
								muted={true}
								playing={true}
								//
								url={screenShareMediaStream}
								//
								height={"100%"}
								width={"100%"}
								onError={(err) => {
									console.log(err, "participant video error");
								}}
							/>
						</>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ParticipantView;
