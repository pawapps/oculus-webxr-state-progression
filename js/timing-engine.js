// Function to reset all trigger variables
var trigger_reset = function() {
  a_pressed = false;
  b_pressed = false;
  x_pressed = false;
  y_pressed = false;
  left_trigger_pressed = false;
  left_grip_pressed = false;
  right_trigger_pressed = false;
  right_grip_pressed = false;
  timer_complete = false;
}

// Function to check if any controller button is being pressed
var is_controller_pressed = function() {
  if (a_pressed) return true;
  if (b_pressed) return true;
  if (x_pressed) return true;
  if (y_pressed) return true;
  if (left_trigger_pressed) return true;
  if (left_grip_pressed) return true;
  if (right_trigger_pressed) return true;
  if (right_grip_pressed) return true;
}

var check_trigger = function() {

  // Check if data loaded
  if (typeof(timing_data) == 'undefined') return;
  if (typeof(active_state) == 'undefined') return;
  if (typeof(active_state.trigger) == 'undefined') return;

  // Check if trigger criteria is met
  const triggered = active_state.trigger(active_state.trigger_data);

  if (!triggered && !purgatory) return;

  if (triggered) {
    // Trigger has been met!
    // Get react timer
    const react_timer_delta = Number(new Date()) - react_timer_start;
    react_timer_log.push(react_timer_delta);
    console.log(react_timer_log);
    
    //Reset all triggers
    trigger_reset();
    purgatory = true;
    return;
  }

  if (purgatory) {
    if (is_controller_pressed()) return;  // remain in purgatory because buttons are still pressed
    purgatory = false;  // continue on
  }

  // At this point, we are progressing to the next state
  active_state_index += 1;  // increment index
  if (active_state.length == active_state_index) return;  // No more states on timing data
  active_state = timing_data[active_state_index];
  active_state.trigger(active_state.trigger_data);
  react_timer_start = new Date(); // reset start of react timer
}

function init() {
  // Set timer to increment every 1 second
  setInterval(check_trigger, 1000/30);
}
init();