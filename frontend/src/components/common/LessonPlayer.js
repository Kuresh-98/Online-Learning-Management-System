import React, { useRef, useEffect, useState } from 'react';

const LessonPlayer = ({ lesson, onComplete, completed }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  // Prevent seeking/skipping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let lastTime = 0;
    const handleSeeking = () => {
      if (video.currentTime > lastTime + 1) {
        video.currentTime = lastTime;
      }
    };
    const handleTimeUpdate = () => {
      lastTime = video.currentTime;
    };
    const handleEnded = () => {
      setVideoEnded(true);
    };
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [lesson.videoUrl]);


  // Reset videoEnded and video time when lesson changes, but only reset video if not completed
  useEffect(() => {
    setVideoEnded(false);
    if (videoRef.current && !completed) {
      videoRef.current.currentTime = 0;
    }
  }, [lesson._id, completed]);

  return (
    <div className="lesson-player">
      <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
      <p className="mb-4 text-gray-600">{lesson.description || 'No description provided for this lesson. Please watch the video to continue.'}</p>
      {lesson.type === 'video' && lesson.videoUrl && (
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          controls
          className="w-full rounded mb-4"
          style={{ maxHeight: 400 }}
        />
      )}
      {lesson.type === 'document' && lesson.documentUrl && (
        <iframe
          src={lesson.documentUrl}
          title="PDF Resource"
          className="w-full rounded mb-4"
          style={{ minHeight: 500 }}
        />
      )}
      <button
        className={`px-4 py-2 rounded text-white 
          ${completed ? 'bg-green-500' : (lesson.type === 'video' && videoEnded) ? 'bg-yellow-500 animate-pulse' : 'bg-blue-600'}
          ${!completed && (lesson.type === 'video' && videoEnded) ? 'hover:bg-yellow-600' : 'hover:bg-blue-700'}`}
        onClick={onComplete}
        disabled={completed || (lesson.type === 'video' && !videoEnded)}
        style={{
          boxShadow: !completed && (lesson.type === 'video' && videoEnded) ? '0 0 10px 2px #facc15' : undefined
        }}
      >
        {completed ? 'Completed' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default LessonPlayer;
