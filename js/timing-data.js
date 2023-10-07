/**
 * Notes:
 *  o text: text to display in window
 *  o trigger: what moves on to the next state
 *    > trigger_a_pressed
 *    > trigger_b_pressed
 *    > trigger_x_pressed
 *    > trigger_y_pressed
 *    > trigger_left_trigger_pressed
 *    > trigger_left_grip_pressed
 *    > trigger_right_trigger_pressed
 *    > trigger_right_grip_pressed
 *    > trigger_timer; {trigger_data: <seconds>}
 *  o background_color: changes the sky color on state load
 *  o sound: sound to play on state load
 *    > sound_loop: true|false, whether the sound loops
 *  o strobe: [array of color values to loop through very quickly]
 * 
 *  Text variables:
 *  o [react_time] will be replaced with the previous states duration
 */



var timing_data = [
  
  {
    text: `getGamePads: \n
            On the next screen, press (A) when\n
            you hear the minions.\n\n
            Press (A) to continue`,
    trigger: trigger_any_pressed,
  },
  {
    sound: 'traffic',
    sound_loop: true,
    trigger: trigger_a_pressed,
  },
  {
    text: 'are you ok?'
  },
  // {
  //   strobe: ['#f00', '#0f0', '#00f'],
  //   trigger: trigger_a_pressed,
  // },
  // {
  //   trigger: trigger_timer,
  //   trigger_data: Math.floor(Math.random() * 2) + 5,
  // },
  // {
  //   sound: 'banana',
  //   sound_loop: true,
  //   trigger: trigger_a_pressed,
  // },
  // {
  //   text: `Your reaction was: [react_time] milliseconds`,
  // }
];
active_state = timing_data[0];