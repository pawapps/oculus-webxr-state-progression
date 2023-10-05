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
 *  o sound_loop: true|false, whether the sound loops
 */

var timing_data = [
  {
    text: `Timing at 0 seconds\n
            Press (A) to continue`,
    trigger: trigger_a_pressed,
    background_color: '#f00'
  },
  {
    text: `State #2, wait 5 seconds`,
    trigger: trigger_timer,
    trigger_data: 5,
    sound: 'banana',
    sound_loop: true
  },
  {
    text: `State #3 has arrived`
  }
];
active_state = timing_data[0];