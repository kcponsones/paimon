import { VideoPropsSettings } from "@/libs/helpers/types";
import { BackgroundEGVideo, BackgroundEGWrapper } from "@/src/styles";
import { useEffect, useRef } from "react";

const BackgroundVid: React.FC<VideoPropsSettings> = ({
  mp4,
  webm,
  height = "100vh",
}) => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [mp4, webm]);

  return (
    <BackgroundEGWrapper videoheight={height}>
      <BackgroundEGVideo autoPlay loop muted preload="auto" ref={videoRef}>
        <source type="video/mp4" src={mp4} />
        <source type="video/webm" src={webm} />
      </BackgroundEGVideo>
    </BackgroundEGWrapper>
  );
};

export default BackgroundVid;
