import React from "react"

const Loading = () => (
	<div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
		<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
	</div>
)

export default Loading
