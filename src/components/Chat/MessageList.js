import { Comment, Typography } from "antd";
import { borderRadius } from "../../constant.js";
const { Title, Text } = Typography;
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var strTime = hours + ":" + minutes + " " + ampm;
	return strTime;
}
const MessageList = ({ messages }) => {
	return (
		<div style={{ margin: "5px" }}>
			{messages?.map((message, i) => {
				const { senderName, message: text, timestamp } = message;
				return (
					<Comment
						style={{
							padding: "5px",
							margin: "5px",
							backgroundColor: "rgba(132,132,132,0.3)",
							borderRadius,
							color: "#FFFFFF"
						}}
						author={
							<Text
								style={{
									color: "#FFFFFF",
									fontWeight: "bold",
									fontSize: "20px"
								}}
							>
								{senderName}
							</Text>
						}
						content={text}
						datetime={<Text style={{}}>{formatAMPM(new Date(timestamp))}</Text>}
					/>
				);
			})}
		</div>
	);
};

export default MessageList;
