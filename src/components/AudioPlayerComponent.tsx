import "../css/AudioPlayerComponent.css";
import "../css/Container.css";
import { useEffect, useRef } from "react";

export default function AudioPlayer(props: { audio: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [props.audio]);

  return (
      <audio className="audio-player container" ref={audioRef} controls>
        <source src={props.audio} type="audio/mpeg"></source>
      </audio>
  );
}