/**
 * Notes:
 *  o sequence_number: Identifies the sequence of screens
 *  o screen_number: Identifies the specific screen in a sequence
 *  o screen_description: Text description of what the particular screen is for
 *  o minimum_screen_duration: Minimum number of seconds a screen needs to be shown before it can progress
 *  o text: text to display in window
 *  o trigger: what moves on to the next state
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


const survey = [
  {
    sequence_number: 1,
    screen_number: 1,
    minimum_screen_duration: 2,
    screen_description: 'Survey instructions: A is introverted, B is extroverted',
    text: `Hello, are you introverted or extroverted?
    > Press (A) for introverted
    > Press (B) for extroverted
    > Press any other button to not answer`,
    trigger: trigger_any_pressed,
    background_color: '#000'
  },
  {
    sequence_number: 1,
    screen_number: 2,
    minimum_screen_duration: 2,
    screen_description: 'Survey thanks',
    text: `Thanks for taking the survey!
    The test will now begin :-)
    
    > Press any button to continue`,
    trigger: trigger_any_pressed,
    background_color: '#000'
  }
];

const react_test = [
  {
    sequence_number: 2,
    screen_number: 1,
    minimum_screen_duration: 2,
    screen_description: 'react test 1 instructions',
    text: `The next screen will be overwhelming.
    When you hear the minion, press any button.
    
    > Press any button to continue`,
    trigger: trigger_any_pressed,
    background_color: '#000'
  },
  {
    sequence_number: 2,
    screen_number: 2,
    screen_description: 'react test 1 visual overwhelming',
    strobe: ['red','yellow'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 5) + 4,    // between 4 and 9 seconds
  },
  {
    sequence_number: 2,
    screen_number: 3,
    screen_description: 'react test 1 visual overwhelming with sound',
    strobe: ('red','yellow'),
    sound: 'banana',
    sound_loop: true,
    trigger: trigger_any_pressed,
  },
  {
    sequence_number: 2,
    screen_number: 4,
    minimum_screen_duration: 2,
    screen_description: 'react test 1 results',
    text: `Your reaction was [react_time] milliseconds`,
    trigger: trigger_any_pressed,
    background_color: '#000'
  },
];


try {
  var timing_data = [
    ...survey,
    ...react_test
  ];
  // Validate timing_data
  let count = 0;
  for (let screen of timing_data) {
    count += 1;
    if (screen.sequence_number === undefined || isNaN(screen.sequence_number)) throw Error(`Missing or invalid sequence_number found on screen #${count};\n${JSON.stringify(screen, null, 2)}`);
    if (screen.screen_number === undefined || isNaN(screen.screen_number)) throw Error(`Missing or invalid screen_number found on screen #${count};\n${JSON.stringify(screen, null, 2)}`);
  }
  active_state = timing_data[0];
} catch(e) {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<pre>${e}</pre>`
}