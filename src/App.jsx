import { useState } from "react"
import { music } from "./music/music"
import { useRef } from "react"
import { useEffect } from "react"
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa"
import styled from "styled-components"
import "./App.css"

const App = () => {

  const Leftdiv = styled.div`
     background: url(${() => music[songindex].profile});
  `;

  // warning if page refreshes
  useEffect(() => {
    const unloadCallback = (event) => {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = ''
      }
      return '';

    };
  //

  // cleanup fuction after refresh
    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    }

  }, [])
  //

  // for play and pause
  const audioEl = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (play) {
      audioEl.current.play()
    } else {
      audioEl.current.pause()
    }
  }, [play])
  const playpause = () => {
    setPlay(!play)
  }

  //

  // change song index
  const [songindex, setSongIndex] = useState(0);
  //

  // go to previous song
  const prevsong = () => {
    setPlay(true)
    if (songindex - 1 < 0) {
      setSongIndex(music.length - 1)
    } else {
      setSongIndex(songindex - 1)
    }
  }
  //

  // go to next song
  const nextsong = () => {
    setPlay(true)
    if (songindex < music.length - 1) {
      setSongIndex(songindex + 1)
    } else {
      setSongIndex(0)
    }
  }
  //

  return (
    <>
      <div className="container">
      <Leftdiv id="left-div" songindex={ songindex }>
      <h1  songindex={ songindex }>{ music[songindex].artist }</h1>
      </Leftdiv>
      <div className="right-div">
      <h2>{ music[songindex].name }</h2>
      <img src={ music[songindex].img } alt={ music[songindex].alt } />
      <div className="time-stamp">
      <audio src={ music[songindex].src }
       ref={ audioEl }
       autoPlay
       controls
      /></div>
      <div className="controls">
      <button onClick={prevsong}><FaStepBackward className="back" /></button>
      <button onClick={playpause}>{ play ? <FaPause className="pause" /> : <FaPlay className="play" /> }</button>
      <button onClick={nextsong}><FaStepForward className="next" /></button>    
      <a href="https://drive.google.com/file/d/1TzRyL_N-qoX8wC_98AV55AMTn9iA1boY/view?usp=drivesdk">download</button>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
