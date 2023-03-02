import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./index";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);

	const { id } = useParams();
	console.log(channelDetail, videos);

	useEffect(() => {
		fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
			setChannelDetail(data?.items[0])
		);

		fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
			(data) => setVideos(data?.items)
		);
	}, [id]);

	return (
		<Box minHeight="95vh">
			<Box>
				<div
					style={{
						background:
							"linear-gradient(90deg, rgba(231,22,22,1) 0%, rgba(253,160,29,1) 56%, rgba(253,36,73,1) 96%)",
						zIndex: 10,
						height: "200px",
					}}
				/>
				<ChannelCard channelDetail={channelDetail} marginTop="-150px" />
			</Box>
			<Box display="flex" p="2">
				<Box sx={{ mr: { sm: "100px" } }} />
				<Videos videos={videos} />
			</Box>
		</Box>
	);
};

export default ChannelDetail;
