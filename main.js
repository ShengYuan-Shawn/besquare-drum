import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import tink from "./sounds/tink.wav";
import snare from "./sounds/snare.wav";
import tom from "./sounds/tom.wav";

// Start Game Button
let app_mode = "";

const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    start_game_btn.textContent = "End Game";
    app_mode = "game";
  }
});

// Record Button
let record_mode = "";
let record_array = [];
var initialTime;

const start_record_btn = document.getElementById("record");
start_record_btn.addEventListener("click", () => {
  if (record_mode === "record") {
    start_record_btn.textContent = "Record";
    record_mode = "";
  } else {
    start_record_btn.textContent = "End Record";
    initialTime = new Date().getTime();
    console.log(initialTime);
    record_mode = "record";
  }
});

// Get Interval Time
var intervalTime;

setInterval(function () {
  var currentTime = new Date().getTime();
  intervalTime = currentTime - initialTime;
});

// Playback Button
let playback_mode = "";

const start_playback_btn = document.getElementById("playback");
start_playback_btn.addEventListener("click", () => {
  if (playback_mode === "playback") {
    (function playSound() {
      var new_initialTime = new Date().getTime();
      let updatedTime = new_initialTime + r.Time;

      key_config.forEach((k) => {
        record_array.forEach((r) => {
          if (r.Key === k.key) {
            const audio = new Audio(k.sound);
            audio.play;
          }
        });
      });
    });
    start_playback_btn.textContent = "Playback";
    playback_mode = "";
  } else {
    start_playback_btn.textContent = "End Playback";
    playback_mode = "playback";
  }
});

// Beat Configuration
const key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "Hi Hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "Open Hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "tink", key: "j", sound: tink },
  { id: "snare", key: "k", sound: snare },
  { id: "tom", key: "l", sound: tom },
];

// Game Logic - Level
const beats = ["f", "d", "f", "d", "f", "f", "d", "f", "d"];
const padding_count = 3;
const emp_array = Array(padding_count).fill("");

const targets = document.getElementById("targets");
let new_array = [...emp_array, ...beats, ...emp_array];

// Game Mode
let current_index = 0;
let score = 0;

const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");
const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    getActualPosition() + 4
  );
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};
updateTargets();

const parent = document.getElementById("controls");
// Parsing Data From Array
key_config.forEach((k) => {
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  control_div.appendChild(control_label);
  control_div.appendChild(control_key);
  parent.appendChild(control_div);

  // On-Click Hover Transitions

  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();

      // If User Key Matches Current Target Key Then We Increment
      if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
        current_index++;
        score++;
      }

      // Record Array
      if (record_mode === "record") {
        let record_desc = {
          Key: e.key,
          Time: intervalTime,
        };
        record_array.push(record_desc);
        console.log(record_array);
      }

      if (getActualPosition() >= new_array.length - padding_count - 1) {
      }
    }
    updateTargets();
  });
});
