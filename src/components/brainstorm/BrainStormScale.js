import React, { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Popconfirm } from "antd";
import "./bstorm.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const BrainStormScale = (props) => {
  const [seconds, setSeconds] = useState([]);
  const [run, setRun] = useState(false);
  const [timerHistory, setTimerHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState({
    isRecording: false,
    buffer: "",
    blobType: "",
    isBlocked: false,
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }, []);

  const startTimer = () => {
    setRun(true);
  };
  const pauseTimer = () => {
    setRun(false);
  };
  const stopTimer = () => {
    setRun(false);
    setTimerHistory([...timerHistory, { time: seconds.length }]);
    setSeconds(0);
  };

  //

  const scale = [];
  for (let i = 0; i < 36; i++) {
    scale.push("|");
  }

  const location = useLocation();
  const [state] = useState(location.state || {});

  const { id } = useParams();

  const recorded = async (audioFile) => {
    console.log("audioFile", audioFile);
    const formData = new FormData();
    formData.append("book_id", state.data.book_id);
    formData.append("brainstorm_name", state.data.brainstorm_name);
    formData.append("description ", state.data.description);
    formData.append("color_id", state.data.color_id);
    formData.append("description", state.data.description);
    formData.append("audio_file ", audioFile);
    console.log("check now22", audioFile);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://charliiapp.clickysoft.net/api/v1/brainstorms/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(response);
      return data;
    } catch (error) {
      console.log("error whilst sending formData", error);
    }
  };

  const onConfirm = () => {
    stop();
    stopTimer();
  };
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    var interval;
    if (run === true) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + "|");
      }, 1000);
    }

    // return () => clearInterval(interval);
  }, [run]);

  const start = () => {
    if (recording.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecording({ ...recording, isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
        setRecording({ ...recording, blobType: blob?.type, buffer: buffer });
        const file = new File(buffer, "me-at-thevoice.mp3", {
          uri: blob,
          type: "audio/mpeg",
          lastModified: Date.now(),
        });
        recorded(file);
        const player = new Audio(URL.createObjectURL(file));
        player.play();
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  return (
    <div
      className="time-scale mt-2 mb-2"
      id={run ? "time-scale-green" : "time-scale-blue"}
    >
      <div className="timer">
        <span>
          <FaBackward
            color="white"
            style={{
              border: "1px solid white",
              borderRadius: "50%",
              marginTop: "13px",
              padding: "5px",
              width: "20px",
              height: "20px",
            }}
          />
        </span>
        <div className="seconds-scale">
          {run
            ? Array.from(seconds).map((s, index) => (
                <ul
                  className="seconds"
                  style={{
                    listStyle: "none",
                    display: "inline-block",
                    margin: "-13px",
                  }}
                  key={index}
                >
                  <li>
                    {s} <br />
                    {index % 5 === 0 ? (
                      <span className="mins">{index}</span>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              ))
            : scale.map((scale, index) => (
                <ul
                  style={{
                    listStyle: "none",
                    display: "inline-block",
                    margin: "-13px",
                  }}
                  key={index}
                >
                  <li>
                    {scale} <br />
                    {index % 5 === 0 ? (
                      <span className="mins">{index}</span>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              ))}
        </div>
        {/* <button onClick={() => start()} disabled={recording?.isRecording}>
          Record
        </button>
        <button onClick={() => stop()} disabled={!recording?.isRecording}>
          Stop
        </button>
        <audio src={recording.blobURL} controls="controls" /> */}
        <span>
          <FaForward
            color="white"
            style={{
              border: "1px solid white",
              borderRadius: "50%",
              marginTop: "13px",
              padding: "5px",
              width: "20px",
              height: "20px",
            }}
          />
        </span>
      </div>
      <div className="wrapper ml-2">
        <div className="audio-buttons">
          <span className="mr-5 mt-1" id="round">
            Round
          </span>

          {!run ? (
            <button
              onClick={() => {
                startTimer();
                start();
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "8px",
                  margin: "6px",
                  borderRadius: "100%",
                  width: "30px",
                }}
              >
                <FaPlay
                  style={{
                    color: run ? "#388D44 " : "2DB6F5",
                    fontSize: "14px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginInline: "2px",
                  }}
                />
              </div>
            </button>
          ) : (
            <Popconfirm
              title="Title"
              description="Do you want to save this recording"
              okText="Yes"
              cancelText="No"
              open={open}
              onConfirm={() => onConfirm()}
              onCancel={handleCancel}
            >
              <button type="button" className="mr-2" onClick={showPopconfirm}>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "8px",
                    margin: "6px",
                    width: "30px",

                    borderRadius: "100%",
                  }}
                >
                  <FaPause
                    style={{
                      color: run ? "#388D44 " : "2DB6F5",
                      fontSize: "12px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginInline: "2px",
                    }}
                  />
                </div>
              </button>
            </Popconfirm>
          )}

          <span>
            <button className="ml-2 mr-2 mt-1" id="re-record">
              Re-record
            </button>
          </span>
          <span>
            <button className="mr-2 mt-1" id="delete">
              Delete
            </button>
          </span>
        </div>
      </div>
      {/* <History timerHistory={timerHistory}/> */}
    </div>
  );
};

export default BrainStormScale;
