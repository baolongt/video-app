import {
	Box,
	Button,
	Chip,
	InputAdornment,
	TextField
} from "@material-ui/core";
import { Keyboard } from "@material-ui/icons";
import React, { useState } from "react";
import queryParams from "../utils/queryParams.js";
import useResponsiveSize from "../utils/useResponsiveSize";

export function MeetingDetailsScreen({ onClickJoin, onClickCreateMeeting }) {
	const [meetingId, setMeetingId] = useState(queryParams.meetingid ?? "");
	const [meetingIdError, setMeetingIdError] = useState(false);
	const padding = useResponsiveSize({
		xl: 6,
		lg: 6,
		md: 6,
		sm: 4,
		xs: 1.5
	});

	return (
		<Box
			m={6}
			style={{
				display: "flex",
				flex: 1,
				width: "100%",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: padding
			}}
		>
			<Button
				style={{
					marginBottom: "1rem"
				}}
				color="primary"
				variant="contained"
				onClick={(e) => {
					onClickCreateMeeting();
				}}
			>
				Create Meeting
			</Button>

			<Chip label="OR" />

			<TextField
				fullwidth
				style={{
					marginTop: "1rem",
					width: "100%"
				}}
				required
				id="outlined"
				label="Meeting ID"
				helperText={
					meetingIdError ? "Meeting id không hợp lệ" : "Nhập meeting id ở đây"
				}
				onChange={(e) => {
					setMeetingId(e.target.value);
				}}
				error={meetingIdError}
				variant="outlined"
				defaultValue={meetingId}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Keyboard />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<Button
								disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
								color="primary"
								variant="contained"
								onClick={(e) => {
									if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
										onClickJoin(meetingId);
									else setMeetingIdError(true);
								}}
								id={"btnJoin"}
							>
								Tham gia
							</Button>
						</InputAdornment>
					)
				}}
			/>
		</Box>
	);
}
