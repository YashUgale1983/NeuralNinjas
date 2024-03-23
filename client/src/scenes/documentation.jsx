import Navbar from "./navbar";

const Documentation = () => {
    return (
        <>
            <Navbar />
            <div className="m-20">
                <p className="text-4xl">API Documentation</p>
                <div className="mt-10 text-2xl">1. Predict Deepfake API</div>
                <div className="mt-5">The Predict Deepfake API endpoint allows users to submit videos for deepfake detection analysis. The endpoint analyzes the provided video and returns a prediction indicating whether the video contains deepfake content or not.</div>
                <div className="mt-5">
                    <p className="mb-3"><strong>Endpoint:</strong> POST /predict</p>
                    <p><strong>Request Parameters:</strong></p>
                    <ul className="mb-3">
                        <li>video: File - The video file to be analyzed for deepfake content. (Supported formats: MP4, AVI, MOV)</li>
                    </ul>
                    <p><strong>Response:</strong></p>
                    <ul className="mb-3">
                        <li>result: String - The prediction result (real or deepfake).</li>
                        <li>confidence: Float - The confidence score associated with the prediction (range: 0.0 to 1.0).</li>
                    </ul>
                    <p><strong>Error Responses:</strong></p>
                    <ul>
                        <li>400 Bad Request - Invalid video format. Supported formats: MP4, AVI, MOV.</li>
                        <li>500 Internal Server Error - An unexpected error occurred while processing the video.</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Documentation;
