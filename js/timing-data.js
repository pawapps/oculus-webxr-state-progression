/**
 * Notes:
 *  o sequence_number: Identifies the sequence of screens
 *  o screen_number: Identifies the specific screen in a sequence
 *  o screen_description: Text description of what the particular screen is for
 *  o minimum_screen_duration: Minimum number of seconds a screen needs to be shown before it can progress
 *  o text: text to display in window
 *  o trigger: what moves on to the next state: 
 *    > trigger_any_pressed
 *    > trigger_a_pressed
 *    > trigger_b_pressed
 *    > trigger_x_pressed
 *    > trigger_y_pressed
 *    > trigger_left_trigger_pressed
 *    > trigger_left_grip_pressed
 *    > trigger_right_trigger_pressed
 *    > trigger_right_grip_pressed
 *    > trigger_timer
 *      - trigger_data: <seconds>
 *      - button_reset_timer: true // will reset timer if button is pressed before timer expires
 *  o background_color: changes the sky color on state load
 *  o sound: banana|traffic|talking
 *    > sound_loop: true|false, whether the sound loops
 *  o strobe: [array of color values to loop through very quickly]
 * 
 *  Text variables:
 *  o [react_time] will be replaced with the previous states duration
 */

const WELCOME_SCREENS_SEQUENCE_NUMBER = 1;
const SURVEY_SCREENS_SEQUENCE_NUMBER = 2;
const PRACTICE_SCREENS_SEQUENCE_NUMBER = 3;
const CHALLENGE1_SCREENS_SEQUENCE_NUMBER = 4;
const CHALLENGE2_SCREENS_SEQUENCE_NUMBER = 5;
const CHALLENGE3_SCREENS_SEQUENCE_NUMBER = 6;
const CHALLENGE4_SCREENS_SEQUENCE_NUMBER = 7;
const CHALLENGE5_SCREENS_SEQUENCE_NUMBER = 8;

var welcome_screens = [
  {
    screen_description: 'Welcome: Warning about strobe lights',
    text: `Welcome to SR Testing\n
    Caution: This production contains strobe lights\n
    > Press 'A' to continue information`,
    background_color: '#828281',
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Welcome: Direction Explaination',
    background_color: '#1f1f1e',
    text: `This will test your reaction time for a sensory overload session,
    followed by a session of just paying attention for the cue. When the cue
    is noticed, press any button. Every 1000 milliseconds is a second.
    > Press 'A' to proceed`,
    trigger: trigger_a_pressed,
  },
];
for (let i = 0; i < welcome_screens.length; i++) {
  welcome_screens[i].sequence_number = WELCOME_SCREENS_SEQUENCE_NUMBER;
  welcome_screens[i].screen_number = i + 1;
  welcome_screens[i].minimum_screen_duration = 1;
}

var survey_screens = [
  {
    screen_description: 'Survey: A = Extrovert, B = Introvert',
    text: `This quick survey will guess if you are introverted or extroverted.
    > Press (A) if being with people gives you energy
    > Press (B) if being with people drains energy
    > Press any other button not to answer`,
    trigger: trigger_any_pressed,
  },
  {
    screen_description: 'Survey thanks',
    text: `Thanks for taking the survey!
    The test will now begin :-)
    
    > Press any button to continue`,
    trigger: trigger_any_pressed,
    background_color: '#000'
  }
];

for (let i = 0; i < survey_screens.length; i++) {
  survey_screens[i].sequence_number = SURVEY_SCREENS_SEQUENCE_NUMBER;
  survey_screens[i].screen_number = i + 1;
  survey_screens[i].minimum_screen_duration = 1;
}

var practice_screens = [
  {
    screen_description: 'Practice: Intro',
    text: `Practice:\n
    Look for a slight increase in light.\n
    Press any button when seen. 
    > Press "A" button to continue`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Practice: Overload timer',
    sound: ('traffic'),
    sound_loop: true,
    background_color: "#474747",
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Practice: Overload trigger',
    sound: ('traffic'),
    sound_loop: true,
    background_color: '#6b6b6b',
    trigger: trigger_any_pressed,
  },
  {
    screen_description: 'Practice: Overload results',
    minimum_screen_duration: 1,
    text: `Your reaction time was [react_time] milliseconds.\n
    Good Job!😃😃😃 
    > Press 'A' to try without overload.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Practice: Intro 2',
    text: `Practice:\n
    Look for a slight increase in light.\n
    Press any button when seen. 
    > Press "A" button to continue`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Practice: Barely Stim timer',
    background_color: "#474747",
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Practice: Barely Stim trigger',
    background_color: '#6b6b6b',
    trigger: trigger_any_pressed,
  },
  {
    screen_description: 'Practice: Barely Stim results',
    minimum_screen_duration: 1,
    text: `Your reaction time was [react_time] milliseconds\n
    Good job! You have finished the practice round.\n
    If this has been too much, this program advises you to take a break. Press any button to continue.`,
    trigger: trigger_any_pressed,
  },
]

for (let i = 0; i < practice_screens.length; i++) {
  practice_screens[i].sequence_number = PRACTICE_SCREENS_SEQUENCE_NUMBER;
  practice_screens[i].screen_number = i + 1;
}

var challenge_1_screens = [
  {
    screen_description: 'Challenge 1: Intro',
    text: `Challenge 1 out of 5:\n
    Listen for a sound.\n
    Press any button when heard. 
    > Press 'A' to continue`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 1: Overload timer',
    strobe: ['red', 'green'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Challenge 1: Overload trigger',
    strobe: ['red', 'green'],
    sound: ('banana'),
    sound_loop: true,
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 1: Overload results',
    text: `Your reation time was [react_time] milliseconds. \n
    Good job! Press any button to continue without overload.`,
    trigger: trigger_any_pressed,
  },
  {
    screen_description: 'Challenge 1: Intro 2',
    text: `Challenge 1 out of 5:\n
    Listen for a sound.\n
    Press any button when heard. Press 'A' to continue`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 1: Barely Stim timer',
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Challenge 1: Barely Stim trigger',
    sound: ('banana'),
    sound_loop: true,
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 1: Barely Stim results',
    text: `Congrats, you have completed the first challenge.\n
    Your reaction time was [react_time] milliseconds.\n
    Press 'A' to continue.`,
    trigger: trigger_a_pressed,
  },
]

for (let i = 0; i < challenge_1_screens.length; i++) {
  challenge_1_screens[i].sequence_number = CHALLENGE1_SCREENS_SEQUENCE_NUMBER;
  challenge_1_screens[i].screen_number = i + 1;
}

var challenge_2_screens = [
  {
    screen_description: 'Challenge 2: Intro',
    text: `Challenge 2 out of 5:\n
    Look for a change in color. \n
    Press any button when seen. Press 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 2: Overload timer',
    strobe: ['white', 'black'],
    sound: ('traffic'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Challenge 2: Overload trigger',
    strobe: ['#828281', 'black'],
    sound: ('traffic'),
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 2: Overload results',
    text: `Good Job. Your reaction time was [react_time] milliseconds.\n
    Press any button to try with less overstimlation.`,
    trigger: trigger_any_pressed,
  },
  {
    screen_description: 'Challenge 2: Intro 2',
    text: `Challenge 2 out of 5:\n
    Look for a change in color. \n
    Press any button when seen. Press 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 2: Barely Stim timer',
    background_color: ('white'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Challenge 2: Barely Stim trigger',
    background_color: ('#828281'),
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 2: Barely Stim results',
    text: `You have finished challenge 2. Your reaction time was [react_time] milliseconds.\n
    Press 'A' to continue to challenge 3.`,
    trigger: trigger_a_pressed
  },
]

for (let i = 0; i < challenge_2_screens.length; i++) {
  challenge_2_screens[i].sequence_number = CHALLENGE2_SCREENS_SEQUENCE_NUMBER;
  challenge_2_screens[i].screen_number = i + 1;
}

var challenge_3_screens = [
  {
    screen_description: 'Challenge 3: Intro',
    text: `Challenge 3 out of 5:\n
    Look for a change in sound. \n
    Press any button when heard. Press 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 3: Overload timer',
    sound: ('traffic'),
    sound_loop: true,
    strobe: ['white', 'black'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    screen_description: 'Challenge 3: Overload trigger',
    sound: ('talking'),
    sound_loop: true,
    strobe: ['white', 'black'],
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 3: Overload results',
    text: `Congrats! Your reaction time was [react_time] milliseconds. Now try without overstimulation.\n
    Press 'A' to continue.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 3: intro 2',
    text: `Challenge 3 out of 5:\n
    Look for a change in sound. \n
    Press any button when heard. Press 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 3: Barely Stim timer',
    sound: ('traffic'),
    sound_loop: true,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 3) + 5,
  },
  {
    screen_description: 'Challenge 3: Barely Stim trigger',
    sound: ('talking'),
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 3: Barely Stim results',
    text: `Great job, your reation time was [react_time] milliseconds.\n
    You are finished with Challenge 3.\n
    Press 'A' to move onto Challenge 4.`,
    trigger: trigger_a_pressed,
  },
]

for (let i = 0; i < challenge_3_screens.length; i++) {
  challenge_3_screens[i].sequence_number = CHALLENGE3_SCREENS_SEQUENCE_NUMBER;
  challenge_3_screens[i].screen_number = i + 1;
}

var challenge_4_screens = [
  {
    screen_description: 'Challenge 4: Intro',
    text: `On this one, there will be all of the sensory overload factors.\n
    The only indicator is a change in the text.\n
    Some words will be deleted. Press any button when seen, and 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 4: Overload timer',
    text: `On this one, there will be all of the sensory overload factors\n
    The only indicator is a change in the text.\n
    Some words will be deleted. Press any button when seen.`,
    sound: ('talking'),
    sound_loop: true,
    strobe: ['red', 'green'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 3) + 5,
  },
  {
    screen_description: 'Challenge 4: Overload trigger',
    text: `On this one, there will be all of the factors\n
    The only is a change in the text.\n
    words will be. Press any button when seen.`,
    sound: ('talking'),
    sound_loop: true,
    strobe: ['red', 'green'],
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 4: Overload results',
    text: `Nice! Your reaction time was [react_time] milliseconds.\n
    Now try without overload by pressing 'A'.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 4: intro 2',
    text: `On this one, there will be all of the sensory overload factors.\n
    The only indicator is a change in the text. Most human reaction times are 1800 miliseseconds faster than concious ones.\n
    Some words will be deleted. Press any button when seen, and 'A' to continue onto the challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 4: Barely Stim timer',
    text: `There will be all of the sensory overload factors. The only indicator is a change in the text.\n
    Some words will be deleted. Press any button when seen.`,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 3) + 5,
  },
  {
    screen_description: 'Challenge 4: Barely Stim trigger',
    text: `On this one, there will be all of the factors\n
    The only is a change in the text.\n
    words will be. Press any button when seen.`,
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 4: Barely Stim results',
    text: `You have completed Challenge 4. Congrats! Your reaction time was [react_time]\n
    milliseconds. Press 'A' to continue onto Challenge 5.`,
    trigger: trigger_a_pressed,
  },
]

for (let i = 0; i < challenge_4_screens.length; i++) {
  challenge_4_screens[i].sequence_number = CHALLENGE4_SCREENS_SEQUENCE_NUMBER;
  challenge_4_screens[i].screen_number = i + 1;
}

var challenge_5_screens = [
  {
    screen_description: 'Challenge 5: Intro',
    text: `Welcome to the last round. This may be slightly wild,\n
    but just be glad to be done! (Ha)\n
    > Press 'A' to start the last challenge...
    ...Press any button when everything stops.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 5: Overload timer',
    sound: ('traffic'),
    strobe: ['black', 'white'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 3) + 5,
  },
  {
    screen_description: 'Challenge 5: Overload trigger',
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 5: Overload results',
    text: `Good. Your reation time was [react_time] milliseconds.\n
    Try without overload, now. Press 'A'.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 5: Intro 2',
    text: `When the text disapears, click any button. Press 'A' to start.`,
    trigger: trigger_a_pressed,
  },
  {
    screen_description: 'Challenge 5: Barely Stim timer',
    text: `Wait for it...`,
    sound_loop: true,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 3) + 5,
  },
  {
    screen_description: 'Challenge 5: Barely Stim trigger',
    trigger: trigger_any_pressed,
  },
  {
    minimum_screen_duration: 1,
    screen_description: 'Challenge 5: Barely Stim results and outro',
    text: `Your final reaction time is [react_time] milliseconds.
    You did an AMAZING job, and your feedback is wonderful. Congrats on 
    making it through the whole thing...I might not have. Thank you!`,
  },
];

for (let i = 0; i < challenge_5_screens.length; i++) {
  challenge_5_screens[i].sequence_number = CHALLENGE5_SCREENS_SEQUENCE_NUMBER;
  challenge_5_screens[i].screen_number = i + 1;
}

try {
  var timing_data = [
    ...welcome_screens,
    ...survey_screens,
    ...practice_screens,
    ...challenge_1_screens,
    ...challenge_2_screens,
    ...challenge_3_screens,
    ...challenge_4_screens,
    ...challenge_5_screens,
  ];
  // Validate timing_data
  let count = 0;
  for (let screen of timing_data) {
    count += 1;
    if (screen === undefined) throw Error(`Undefined screen found on screen #${count};\n${JSON.stringify(screen, null, 2)}\n\nTo help find this screen the previous good screen #${count - 1} is: ${JSON.stringify(timing_data[count - 2], null, 2)}`);
    if (screen.strobe !== undefined && typeof(screen.strobe) !== "object") throw Error(`Bad strobe found on screen #${count};\n${JSON.stringify(screen, null, 2)}`);
    if (screen.sequence_number === undefined || isNaN(screen.sequence_number)) throw Error(`Missing or invalid sequence_number found on screen #${count};\n${JSON.stringify(screen, null, 2)}`);
    if (screen.screen_number === undefined || isNaN(screen.screen_number)) throw Error(`Missing or invalid screen_number found on screen #${count};\n${JSON.stringify(screen, null, 2)}`);
  }
  active_state = timing_data[0];
} catch (e) {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<pre>${e.stack}</pre>`
}