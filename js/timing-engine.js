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

  if (!triggered && !purgatory && !cleared_purgatory && typeof(active_state.button_reset_timer) != 'undefined' && any_pressed) {
    // A button was pressed while a timer was running, so the timer needs reset
    // Delete the existing timer
    clearTimeout(trigger_timer_timeout);
    trigger_timer_timeout = undefined;
    trigger_reset();  // reset the buttons
    // Start the timer over again
    active_state.trigger(active_state.trigger_data);
  }

  if (!triggered && !purgatory && !cleared_purgatory) return;

  if (triggered && !purgatory && !cleared_purgatory) {
    // Enter purgatory (processing post trigger)
    purgatory = true;

    // Trigger has been met!
    // Update active_state with relevant data

    // Get react timer
    if (active_state.screen_duration === undefined) {
      const react_timer_delta = Number(new Date()) - react_timer_start;
      if (active_state.minimum_screen_duration * 1000 > react_timer_delta) {
        // Minimum screen duration has not yet been 
        trigger_reset();
        purgatory = false;
        return;
      }
      active_state.screen_duration = react_timer_delta;
    }

    // Get trigger values
    active_state.trigger_values = {
      a_pressed: a_pressed,
      b_pressed: b_pressed,
      x_pressed: x_pressed,
      y_pressed: y_pressed,
      left_trigger_pressed: left_trigger_pressed,
      left_grip_pressed: left_grip_pressed,
      right_trigger_pressed: right_trigger_pressed,
      right_grip_pressed: right_grip_pressed,
      any_pressed: any_pressed,
      timer_complete: timer_complete,
    }

    // Session ID
    active_state.session_id = session_id;
    active_state.dtg = new Date();

    // Save active_state to database
    const save = async function(inputs) {
      console.log(JSON.stringify(inputs, null, 2));

      let params = inputs;
      if (params.screen_description === undefined) params.screen_description = "";

      const url = `https://collector.pwlk.net/reaction/new`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(params),
        cache: 'no-store'
      }).then((res) => res.json());
    
      console.log(JSON.stringify(response, null, 2));
      return response;
    }
    save({...active_state});
    
    //Reset all triggers
    trigger_reset();
    return;
  }

  if (purgatory) {
    if (any_pressed) {
      trigger_reset();
      return;  // remain in purgatory because buttons are still pressed
    }
    purgatory = false;  // continue on
    cleared_purgatory = true;
  }

  // At this point, we are progressing to the next state
  if (cleared_purgatory) {
    cleared_purgatory = false;
    const duration = active_state.screen_duration;
    active_state_index += 1;  // increment index
    if (active_state.length == active_state_index) return;  // No more states on timing data
    active_state = timing_data[active_state_index];
    if (active_state.text !== undefined) active_state.text = active_state.text.replace('[react_time]', duration);
    if (active_state.trigger !== undefined) active_state.trigger(active_state.trigger_data);
    react_timer_start = new Date(); // reset start of react timer
  }
}

function init() {
  // Set timer to increment every 1 second
  setInterval(check_trigger, 1000/30);
}
init();