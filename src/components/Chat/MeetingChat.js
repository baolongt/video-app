import { usePubSub } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { borderRadius } from "../../constant.js";
import MessageList from "./MessageList.js";
import { Button, Input, Typography } from "antd";
import { InputAdornment, TextField } from "@material-ui/core";

const { Title } = Typography;

const MeetingChat = ({ tollbarHeight }) => {
	const { publish, messages } = usePubSub("CHAT", {});
	const [message, setMessage] = useState("");

	const handleTexting = (message) => {
		setMessage(message);
	};

	const handleSendMessage = () => {
		if (message.length) {
			publish(message, { persist: true });
			setMessage("");
		}
	};

	return (
		<div
			style={{
				marginLeft: borderRadius,
				width: 400,
				backgroundColor: "#000000",
				overflowY: "scroll",
				borderRadius,
				height: `calc(100vh - ${tollbarHeight + 2 * borderRadius}px)`,
				padding: borderRadius
			}}
		>
			<div style={{ display: "flex", marginTop: "10px" }}>
				<TextField
					value={message}
					fullWidth
					id="outlined-basic"
					label="Nhắn tin"
					variant="outlined"
					onChange={(e) => {
						handleTexting(e.target.value);
					}}
					InputProps={{
						startAdornment: <InputAdornment position="start"></InputAdornment>,
						endAdornment: (
							<InputAdornment position="end">
								<Button
									disabled={message.length <= 0}
									color="primary"
									variant="contained"
									onClick={handleSendMessage}
									id={"btnJoin"}
								>
									Send
								</Button>
							</InputAdornment>
						)
					}}
				/>
				{/* <Input
					value={message}
					onChange={(e) => {
						const v = e.target.value;
						setMessage(v);
					}}
				/>
				<Button
					onClick={() => {
						const m = message;

						if (m.length) {
							publish(m, { persist: true });
							setMessage("");
						}
					}}
				>
					Send
				</Button> */}
			</div>
			<MessageList messages={messages} />
		</div>
	);
};

export default MeetingChat;
