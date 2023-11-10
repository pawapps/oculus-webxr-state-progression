/**
 * Notes:
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

var welcome_screens = [
  {
    text: `Welcome to SR Testing\n
    Caution: This production contains strobe lights\n
    Press 'A' to continue information`,
    background_color: '#828281',
    trigger: trigger_a_pressed,
  },
  {
    background_color: '#1f1f1e',
    text: `This will test your reaction time for:\n
    sensory overload v.s no sensory overload.
    You can press ANY BUTTON, but do not spam click it,
    or it will not count. This is a formal reminder
    that you will be on guard for whatever the
    screen says while a sensory overload is occuring,
    then no sensory overload.\n
    Thank you. Press 'A' to continue.`,
    trigger: trigger_a_pressed,
  },
]

var practice_screens = [
  {
    sound: ('traffic'),
    sound_loop: true,
    background_color: "#474747",
    text: `Pracice:\n
    look for a slight increase in light.\n
    Press any button when seen.`,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    sound: ('traffic'),
    sound_loop: true,
    background_color:'#6b6b6b',
    text: `Practice:\n
    look for a slight increase in light.\n
    Press any button when seen.`,
    trigger: trigger_any_pressed,
  },
  {
    text: `Your reaction time was [react_time] milliseconds.\n
    Good Job!😃😃😃 Press 'A' to try without overload.`,
    trigger: trigger_a_pressed,
  },
  {
    background_color: "#474747",
    text: `Practice:\n
    look for a slight increase in light.\n
    Press any button when seen.`,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    background_color: '#6b6b6b',
    text: `Practice:\n
    look for a slight increase in light.\n
    Press any button when seen.`,
    trigger: trigger_any_pressed,
  },
  {
    text: `Your reaction time was [react_time] milliseconds\n
    Good job! You have finished the practice round.\n
    If this has been too much, this program advises you to take a break. Press any button to continue.`,
    trigger: trigger_any_pressed
  },
]

var challenge_1_screens = [
  {
    text: `Challenge 1 out of 5:\n
    Listen for a sound.\n
    Press any button when seen.`,
    strobe: ['red','green'],
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: 1,//Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challenge 1 out of 5:\n
    Listen for a sound.\n
    Press any button when seen.`,
    strobe: ['red','green'],
    sound: ('banana'),
    sound_loop: true,
    trigger: trigger_any_pressed,
  },
  {
    text: `Your reation time was [react_time] milliseconds. \n
    Good job! Press any button to continue without overload.`,
    trigger: trigger_any_pressed,
  },
  {
    text: `Challange 1 out of 5:\n
    Listen for a sound\n
    Press any button when seen.`,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: 1,//Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challange 1 out of 5:\n
    Listen for a sound\n
    Press any button when seen.`,
    sound: ('banana'),
    sound_loop: true,
    trigger: trigger_any_pressed,
  },
  {
    text: `Congrats, you have completed the first challenge.\n
    Your reaction time was [react_time] milliseconds.\n
    Press 'A' to continue.`,
    trigger: trigger_a_pressed,
  },
]

var challenge_2_screens = [
  {
    text: `Challenge 2 out of 5:\n
    Look for a change in color. \n
    Press any button when seen.`,
    strobe: ['white','black'],
    sound: ('traffic'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challenge 2 out of 5:\n
    Look for a change in color.\n
    Press any button when seen.`,
    strobe: ['#828281', 'black'],
    sound: ('traffic'),
    trigger: trigger_any_pressed,
  },
  {
    text: `Good Job. Your reaction time was [react_time] milliseconds.\n
    Press any button to try without overstimlation.`,
    trigger: trigger_any_pressed,
  },
  {
    text: `Challenge 2 out of 5:\n
    Look for a change in color.
    Press any button when seen.`,
    background_color: ('white'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challenge 2 out of 5:\n
    Look for a change in color.\n
    Press any button when seen.`,
    background_color: ('#828281'),
    trigger: trigger_any_pressed,
  },
  {
    text: `You have finished challenge 2. Your reaction time was [react_time] milliseconds.\n
    Press 'A' to continue to challenge 3.`,
    trigger: trigger_a_pressed
  },
]
var challenge_3_screens = [
  {
    text: `Challenge 3 out of 5: Listen for a change in sound.\n
    Press any button when heard.`,
    sound: ('traffic'),
    sound_loop: true,
    strobe: ('white','black'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challenge 3 out of 5: Listen for a change in sound.\n
    Press any button when heard.`,
    sound: ('talking'),
    sound_loop: true,
    strobe: ('white','black'),
    trigger: trigger_any_pressed,
  },
  {
    text: `Congrats! Your reaction time was [react_time] milliseconds. Now try without overstimulation.\n
    Press 'A' to continue.`,
    trigger: trigger_a_pressed,
  },
  {
    text: `Challange 3 out of 5: Listen for a change in sound.\n
    Press any button when heard.`,
    sound: (traffic),
    sound_loop: true,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Challenge 3 out of 5: Listen for a change in sound.\n
    Press any button when heard.`,
    sound: ('talking'),
    trigger: trigger_any_pressed,
  },
  {
    text: `Great job, your reation time was [react_time] milliseconds.\n
    You are finished with Challenge 3.\n
    Press 'A' to move onto Challenge 4.`,
    trigger: trigger_a_pressed,
  },
]
var challenge_4_screens = [
  {
    text: `On this one, there will be all of the sensory overload factors\n
    The only indicator is a change in the text.\n
    Two words will be deleted. Press any button when seen.`,
    sound: ('talking'),
    sound_loop: true,
    strobe: ('red','green'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `On this one, there will be all of the sensory overload factors\n
    The only is a change in the text.\n
    Two words will be. Press any button when seen.`,
    sound: ('talking'),
    sound_loop: true,
    strobe: ('red','green'),
    trigger: trigger_any_pressed,
  },
  {
    text: `Nice! Your reaction time was [react_time] milliseconds.\n
    Now try without overload by pressing 'A'.`,
    trigger: trigger_a_pressed,
  },
  {
    text: `On this one, there will be all of the sensory overload factors\n
    The only indicator is a change in the text.\n
    Two words will be deleted. Press any button when seen.`,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `On this one, there will be all of the sensory overload factors\n
    The only is a change in the text.\n
    Two words will be. Press any button when seen.`,
    trigger: trigger_any_pressed,
  },
  {
    text: `You have completed Challenge 4. Contrats! Your reaction time was [react_time]\n
    milliseconds. Press 'A' to continue onto Challenge 5.`,
    trigger: trigger_a_pressed,
  },
]
var challenge_5_screens = [
  {
    text: `Welcome to the last round. This may be slightly wild,\n
    but just be gald to be done! (Ha)\n
    Press 'A' to start the last Challenge.`,
    trigger: trigger_a_pressed,
  },
  {
    text: `Last Challenge...press the button when everything stops.\n
    Good luck.`,
    sound: ('traffic'),
    strobe: ('balck','white'),
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    trigger_any_pressed,
  },
  {
    text: `Good. Your reation time was [react_time] milliseconds.\n
    Try without overload, now. Press 'A'.`,
    trigger: trigger_a_pressed,
  },
  {
    text: `There is going to be a sound that may be considered as an ovistimulation factor,
    but that is just part of getting an accurate result. Press any button when everyting stops.`,
    sound: ('traffic'),
    sound_loop: true,
    trigger: trigger_timer,
    button_reset_timer: true,
    trigger_data: Math.floor(Math.random() * 2) + 5,
  },
  {
    text: `Your final reaction time is [react_time] milliseconds.
    You did an AMAZING job, and your feedback is wonderful. Congrats on 
    making it through the whole thing...I might not have. Thank you!`,
  },
];

const test_screens = [
  {
    text: 'test',
    trigger: trigger_any_pressed,
    background_color: '#00ff00'
  },
]


try {
  var timing_data = [
    ...test_screens,
    // ...welcome_screens,
    // ...practice_screens,
    ...challenge_1_screens,
    // ...challenge_2_screens,
    // ...challenge_3_screens,
    // ...challenge_4_screens,
    // ...challenge_5_screens,
    ,
  ];
  active_state = timing_data[0];
} catch(e) {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `<pre>${e}</pre>`
}