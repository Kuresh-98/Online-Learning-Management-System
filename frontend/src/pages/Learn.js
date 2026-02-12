import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import LessonPlayer from '../components/common/LessonPlayer';
import toast from 'react-hot-toast';

const Learn = () => {
    const { id } = useParams(); // courseId
    const [lessons, setLessons] = useState([]);
    const [current, setCurrent] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const [loading, setLoading] = useState(true);

    // ...existing code...

    useEffect(() => {
        fetchLessons();
        fetchProgress();
        // ...existing code...
        // eslint-disable-next-line
    }, [id]);

    // When both lessons and completedLessons are loaded, set current to first incomplete lesson
    useEffect(() => {
        if (lessons.length && completedLessons) {
            // Defensive: ensure completedLessons is array of IDs
            const completedIds = completedLessons.map(l => typeof l === 'object' && l._id ? l._id : l);
            // Find first incomplete lesson by course order
            const firstIncompleteIdx = lessons.findIndex(l => !completedIds.includes(l._id));
            if (firstIncompleteIdx > -1) {
                if (current !== firstIncompleteIdx) setCurrent(firstIncompleteIdx);
            } else {
                // All lessons completed, go to last lesson
                if (current !== lessons.length - 1) setCurrent(lessons.length - 1);
            }
        }
    }, [lessons, completedLessons, current]);

    const fetchLessons = async () => {
        try {
            const res = await api.get(`/lessons/course/${id}`);
            setLessons(res.data.data || []);
        } catch (err) {
            toast.error('Failed to load lessons');
        } finally {
            setLoading(false);
        }
    };

    const fetchProgress = async () => {
        try {
            const res = await api.get(`/enrollments/my-courses`);
            const enrollment = (res.data.data || []).find(e => e.course._id === id);
            // Defensive: completedLessons may be array of IDs or objects
            let completed = enrollment?.completedLessons || [];
            if (completed.length && typeof completed[0] === 'object' && completed[0]._id) {
                completed = completed.map(l => l._id);
            }
            setCompletedLessons(completed);
            setEnrollmentId(enrollment?._id || null);
        } catch (err) {
            setEnrollmentId(null);
        }
    };

    const handleComplete = async () => {
        const lesson = lessons[current];
        if (!enrollmentId) {
            toast.error('You are not enrolled in this course.');
            return;
        }
        try {
            await api.put(`/enrollments/${enrollmentId}/complete-lesson`, { lessonId: lesson._id });
            setCompletedLessons([...completedLessons, lesson._id]);
            toast.success('Lesson marked as complete!');
        } catch (err) {
            toast.error('Failed to mark complete');
        }
    };

    // Track videoEnded state for each lesson by index
    const [videoEndedArr, setVideoEndedArr] = useState([]);

    useEffect(() => {
        // Reset videoEndedArr when lessons change
        setVideoEndedArr(Array(lessons.length).fill(false));
    }, [lessons.length]);

    const setVideoEnded = (ended) => {
        setVideoEndedArr(arr => {
            const newArr = [...arr];
            newArr[current] = ended;
            return newArr;
        });
    };

    let mainContent;
    if (loading) {
        mainContent = <div>Loading...</div>;
    } else if (!lessons.length) {
        mainContent = <div className="max-w-3xl mx-auto py-8 text-center text-gray-500">No lessons found for this course.</div>;
    } else {
        const lesson = lessons[current];
        const completed = completedLessons.includes(lesson._id);
        const isVideo = lesson.type === 'video';
        const videoEnded = videoEndedArr[current] || false;
        mainContent = (
            <div className="max-w-3xl mx-auto py-8 mt-24">
                <LessonPlayer lesson={lesson} onComplete={handleComplete} completed={completed} setVideoEnded={setVideoEnded} />
                <div className="flex justify-between mt-6">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={() => setCurrent(c => Math.max(0, c - 1))}
                        disabled={current === 0}
                    >
                        Previous
                    </button>
                    <span>Lesson {current + 1} of {lessons.length}</span>
                    <button
                        className={`px-4 py-2 rounded 
                            ${current === lessons.length - 1 ? 'bg-gray-200' : (completed ? 'bg-yellow-500 animate-pulse hover:bg-yellow-600' : 'bg-gray-200')}`}
                        onClick={() => setCurrent(c => Math.min(lessons.length - 1, c + 1))}
                        disabled={current === lessons.length - 1 || (isVideo && !completed && !videoEnded)}
                        style={{
                            boxShadow: completed && current !== lessons.length - 1 ? '0 0 10px 2px #facc15' : undefined
                        }}
                    >
                        Next
                    </button>
                </div>
                {/* Summary section below navigation */}
                <div className="mt-8 p-4 bg-gray-50 rounded shadow max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Lesson Summary</h3>
                    <div className="text-gray-700 whitespace-pre-line">{lesson.summary || 'No summary available for this lesson.'}</div>
                </div>
            </div>
        );
    }

    return mainContent;
};

export default Learn;
