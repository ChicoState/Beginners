import { useState, useEffect } from 'react';
import IphoneSearch from '../app/IphoneSupport/IphoneSearch';
import ProgressTracker from '../Checkpoints/ProgressTracker';
import '../app/IphoneSupport/IphoneSupport.css';

export default function IphonePage() {
    const [videoComments, setVideoComments] = useState([[], [], []]);
    const [uploadedVideoComments, setUploadedVideoComments] = useState([]);
    const [commentInputs, setCommentInputs] = useState(['', '', '']);
    const [replyInputs, setReplyInputs] = useState([[], [], []]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [videoTitles, setVideoTitles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [canProceed, setCanProceed] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [titleInputs, setTitleInputs] = useState([]);

    useEffect(() => {
        const storedVideos = JSON.parse(localStorage.getItem('uploadedVideos')) || [];
        const storedTitles = JSON.parse(localStorage.getItem('videoTitles')) || [];
        setUploadedVideos(storedVideos);
        setVideoTitles(storedTitles);
        setUploadedVideoComments(new Array(storedVideos.length).fill([]));
    }, []);

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    const handleCommentSubmit = (index) => {
        const commentInput = commentInputs[index];
        if (commentInput) {
            const updatedComments = [...videoComments];
            updatedComments[index].push({ text: commentInput, replies: [] });
            setVideoComments(updatedComments);
            setCommentInputs((prev) => {
                const newInputs = [...prev];
                newInputs[index] = '';
                return newInputs;
            });
        }
    };

    const handleUploadedCommentSubmit = (uploadedIndex) => {
        const commentInput = commentInputs[uploadedIndex + 3];
        if (commentInput) {
            const updatedComments = [...uploadedVideoComments];
            updatedComments[uploadedIndex] = updatedComments[uploadedIndex] || [];
            updatedComments[uploadedIndex].push({ text: commentInput, replies: [] });
            setUploadedVideoComments(updatedComments);
            setCommentInputs((prev) => {
                const newInputs = [...prev];
                newInputs[uploadedIndex + 3] = '';
                return newInputs;
            });
        }
    };

    const handleReplySubmit = (videoIndex, commentIndex) => {
        const replyInput = replyInputs[videoIndex]?.[commentIndex] || '';
        if (replyInput) {
            const updatedComments = [...uploadedVideoComments];
            if (updatedComments[videoIndex] && updatedComments[videoIndex][commentIndex]) {
                if (!updatedComments[videoIndex][commentIndex].replies) {
                    updatedComments[videoIndex][commentIndex].replies = [];
                }
                updatedComments[videoIndex][commentIndex].replies.push({ text: replyInput });
                setUploadedVideoComments(updatedComments);
                setReplyInputs((prev) => {
                    const newReplies = [...prev];
                    newReplies[videoIndex] = newReplies[videoIndex] || [];
                    newReplies[videoIndex][commentIndex] = '';
                    return newReplies;
                });
            }
        }
    };

    const handleDeleteUploadedVideo = (uploadedIndex) => {
        const updatedVideos = uploadedVideos.filter((_, index) => index !== uploadedIndex);
        const updatedComments = uploadedVideoComments.filter((_, index) => index !== uploadedIndex);
        const updatedTitles = videoTitles.filter((_, index) => index !== uploadedIndex);
        setUploadedVideos(updatedVideos);
        setUploadedVideoComments(updatedComments);
        setVideoTitles(updatedTitles);
        localStorage.setItem('uploadedVideos', JSON.stringify(updatedVideos));
        localStorage.setItem('videoTitles', JSON.stringify(updatedTitles));
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoFile(file);
            setUploadedVideos((prevVideos) => {
                const updatedVideos = [...prevVideos, videoURL];
                localStorage.setItem('uploadedVideos', JSON.stringify(updatedVideos));
                setUploadedVideoComments((prevComments) => [...prevComments, []]);
                setVideoTitles((prevTitles) => [...prevTitles, '']);
                return updatedVideos;
            });
        }
    };

    const handleTitleInputChange = (index, title) => {
        const updatedTitleInputs = [...titleInputs];
        updatedTitleInputs[index] = title;
        setTitleInputs(updatedTitleInputs);
    };

    const handleSaveTitle = (index) => {
        const updatedTitles = [...videoTitles];
        updatedTitles[index] = titleInputs[index];
        setVideoTitles(updatedTitles);
        localStorage.setItem('videoTitles', JSON.stringify(updatedTitles));
    };

    const handleCompletion = () => {
        console.log("Progress completed");
        setCanProceed(true);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center">
            <ProgressTracker handleCompletion={handleCompletion} />

            <h1 className="glow cursive-font animate-fadeIn">iPhone Video Guides</h1>
            <IphoneSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

            <div className="main-video-button" onClick={() => document.getElementById('main-video-upload-input').click()} style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#444', color: '#fff', borderRadius: '5px', textAlign: 'center', marginBottom: '20px' }}>
                Import Your Own Guide
                <input
                    id="main-video-upload-input"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                    data-testid="main-video-upload-input"
                />
            </div>

            {uploadedVideos.map((videoURL, uploadedIndex) => (
                <div key={uploadedIndex} className="uploaded-video-container mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <video controls src={videoURL} className="uploaded-video" style={{ width: '100%', height: 'auto' }}></video>
                    
                    {videoTitles[uploadedIndex] ? (
                        <p className="video-title mt-2 text-center">{videoTitles[uploadedIndex]}</p>
                    ) : (
                        <div className="title-input-container mt-2">
                            <input
                                type="text"
                                placeholder="Enter video title..."
                                value={titleInputs[uploadedIndex] || ''}
                                onChange={(e) => handleTitleInputChange(uploadedIndex, e.target.value)}
                                className="video-title-input"
                            />
                            <button onClick={() => handleSaveTitle(uploadedIndex)} className="save-title-button ml-2">
                                Enter
                            </button>
                        </div>
                    )}

                    <div className="comments mt-4">
                        {uploadedVideoComments[uploadedIndex] && uploadedVideoComments[uploadedIndex].length > 0 ? (
                            uploadedVideoComments[uploadedIndex].map((comment, commentIndex) => (
                                <div key={commentIndex} className="comment mb-2">
                                    <p>{comment.text}</p>
                                    <div className="replies">
                                        {comment.replies && comment.replies.map((reply, replyIndex) => (
                                            <div key={replyIndex} className="reply mb-1">
                                                <p>{reply.text}</p>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="Reply..."
                                            value={replyInputs[uploadedIndex]?.[commentIndex] || ''}
                                            onChange={(e) => {
                                                const updatedReplies = [...replyInputs];
                                                updatedReplies[uploadedIndex] = updatedReplies[uploadedIndex] || [];
                                                updatedReplies[uploadedIndex][commentIndex] = e.target.value;
                                                setReplyInputs(updatedReplies);
                                            }}
                                            className="reply-input"
                                        />
                                        <button onClick={() => handleReplySubmit(uploadedIndex, commentIndex)} className="reply-submit-button hover:bg-blue-600 transition duration-300">Reply</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet. Be the first to comment!</p>
                        )}
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[uploadedIndex + 3] || ''}
                            onChange={(e) => {
                                const updatedInputs = [...commentInputs];
                                updatedInputs[uploadedIndex + 3] = e.target.value;
                                setCommentInputs(updatedInputs);
                            }}
                            className="comment-input"
                        />
                        <button onClick={() => handleUploadedCommentSubmit(uploadedIndex)} className="comment-submit-button hover:bg-green -600 transition duration-300">Comment</button>
                        <button onClick={() => handleDeleteUploadedVideo(uploadedIndex)} className="delete-video-button hover:bg-red-600 transition duration-300">Delete Video</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
