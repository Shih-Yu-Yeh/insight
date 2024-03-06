import React, { useState, useRef, useEffect, ReactNode } from 'react';
import YouTube from 'react-youtube';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [inputVideoId, setInputVideoId] = useState<string>("9QqBz3kNHis");
  const [youtubeKey, setYoutubeKey] = useState<number>(0);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [cameraWidth, setCameraWidth] = useState<number | null>(null);
  const [cameraHeight, setCameraHeight] = useState<number | null>(null);
  const [videoStreaming, setVideoStreaming] = useState<boolean>(true); // State to track video streaming

  const webcamRef = useRef<any>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (videoContainerRef.current) {
        const { width, height } = videoContainerRef.current.getBoundingClientRect();
        setCameraWidth(width);
        setCameraHeight(height);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleCardClick = () => {
    setShowDialog(true);
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    if (source === "Youtube") {
      setInputVideoId("9QqBz3kNHis"); // Set default video id
    }
    setVideoStreaming(true); // Reset video streaming to true
    setShowDialog(false); // Close the dialog after selecting a source
  };

  const handleCloseVideoSource = () => {
    setVideoStreaming(false); // Turn off video streaming
  };

  const handleClickOutsideDialog = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setShowDialog(false);
    }
  };

  useEffect(() => {
    if (showDialog) {
      document.addEventListener('mousedown', handleClickOutsideDialog);
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideDialog);
      };
    }
  }, [showDialog]);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark" onClick={handleCardClick}>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">{total}</h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>

      <div ref={videoContainerRef} className="mt-4">
        {selectedSource === "Youtube" && videoStreaming && (
          <YouTube
            key={youtubeKey}
            videoId={inputVideoId}
            opts={{
              width: cameraWidth,
              height: cameraHeight,
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        )}
        {selectedSource === "內建WebCam" && videoStreaming && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user", // 使用前置攝像頭
            }}
            onUserMedia={() => { }}
          />
        )}
      </div>

      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div ref={dialogRef} className="bg-white p-6 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">選擇訊號來源</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2" onClick={() => handleSourceSelect("Youtube")}>
              Youtube 直播
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2" onClick={() => handleSourceSelect("內建WebCam")}>
              內建 WebCam
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2" onClick={() => handleSourceSelect("外部IP Cam")}>
              外部 IP Cam
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mb-2" onClick={handleCloseVideoSource}>
              關閉視訊源
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDataStats;
