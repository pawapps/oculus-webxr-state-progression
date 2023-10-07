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
  any_pressed = false;
  timer_complete = false;
}

var check_trigger = function() {

  // Check if data loaded
  if (typeof(timing_data) == 'undefined') return;
  if (typeof(active_state) == 'undefined') return;
  if (typeof(active_state.trigger) == 'undefined') return;

  // Check if trigger criteria is met
  const triggered = active_state.trigger(active_state.trigger_data);

  if (!triggered && typeof(active_state.button_reset_timer) != 'undefined' && any_pressed) {
    // A button was pressed while a timer was running, so the timer needs reset
    // Delete the existing timer
    clearTimeout(trigger_timer_timeout);
    trigger_timer_timeout = undefined;
    trigger_reset();  // reset the buttons
    // Start the timer over again
    active_state.trigger(active_state.trigger_data);
  }

  if (!triggered && !purgatory) return;

  if (triggered) {
    // Trigger has been met!
    // Get react timer
    if (active_state.duration === undefined) {
      const react_timer_delta = Number(new Date()) - react_timer_start;
      active_state.duration = react_timer_delta;
    }
    
    //Reset all triggers
    trigger_reset();
    purgatory = true;
    return;
  }

  if (purgatory) {
    if (any_pressed) return;  // remain in purgatory because buttons are still pressed
    purgatory = false;  // continue on
  }

  // At this point, we are progressing to the next state
  const duration = active_state.duration;
  active_state_index += 1;  // increment index
  if (active_state.length == active_state_index) return;  // No more states on timing data
  active_state = timing_data[active_state_index];
  if (active_state.text !== undefined) active_state.text = active_state.text.replace('[react_time]', duration);
  if (active_state.trigger !== undefined) active_state.trigger(active_state.trigger_data);
  react_timer_start = new Date(); // reset start of react timer
}

function init() {
  // Set timer to increment every 1 second
  setInterval(check_trigger, 1000/30);
}
init();