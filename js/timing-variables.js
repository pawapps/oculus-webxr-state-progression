// Initialize controller trigger variables
var a_pressed = false;
var b_pressed = false;
var x_pressed = false;
var y_pressed = false;
var left_trigger_pressed = false;
var left_grip_pressed = false;
var right_trigger_pressed = false;
var right_grip_pressed = false;

// Initialize timing trigger variables
var timer_complete = false;

// Initialize trigger functions
var trigger_timer_timeout = undefined;
var trigger_timer = (seconds) => {
  // Check if timer has completed
  if (timer_complete) return true;
  // Check if timer is running, no need to run multiple timers
  if (trigger_timer_timeout !== undefined) return false;
  // At this point, no timer has been set, go ahead and set it
  trigger_timer_timeout = setTimeout(function() {
    timer_complete = true;
    trigger_timer_timeout = undefined;
  }, seconds*1000);
  return false;
}
var trigger_a_pressed = (data) => a_pressed;
var trigger_b_pressed = (data) => b_pressed;
var trigger_x_pressed = (data) => x_pressed;
var trigger_y_pressed = (data) => y_pressed;
var trigger_left_trigger_pressed = (data) => left_trigger_pressed;
var trigger_left_grip_pressed = (data) => left_grip_pressed;
var trigger_right_trigger_pressed = (data) => right_trigger_pressed;
var trigger_right_grip_pressed = (data) => right_trigger_pressed;

// Reaction timer (from state load to trigger)
var react_timer_start = new Date();
var react_timer_log = [];

// active state of timing_data
var active_state_index = 0;
var active_state = undefined;

// Purgatory is the time a trigger has been met, but buttons are still pressed
var purgatory = false;