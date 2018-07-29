'use strict';

goog.provide('Blockly.Blocks.turtlebot3'); // Deprecated
goog.provide('Blockly.Constants.turtlebot3');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
	{ 
	 "type": "init_turtle",
	  "message0": "Turtle",
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 290,
	  "tooltip": "Create a new turtle instance",
	  "helpUrl": ""
	},

	{
	  "type": "move_turtlebot",
	  "message0": "Move Turtlebot %1 %2 At Speed %3 %4",
	  "args0": [
		{
		  "type": "field_dropdown",
		  "name": "Opt_Direction",
		  "options": [
			[
			  "Forward",
			  "FORWARD"
			],
			[
			  "Backward",
			  "BACKWARD"
			]
		  ]
		},
		{
		  "type": "input_dummy",
		  "name": "Direction",
		  "align": "RIGHT"
		},
		{
		  "type": "field_dropdown",
		  "name": "Opt_Speed",
		  "options": [
			[
			  "Slow",
			  "SLOW"
			],
			[
			  "Medium",
			  "MEDIUM"
			],
			[
			  "Fast",
			  "FAST"
			]
		  ]
		},
		{
		  "type": "input_dummy",
		  "name": "Speed",
		  "align": "RIGHT"
		},
	  ],
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 230,
	  "tooltip": "Control the speed of the turtlebot",
	  "helpUrl": ""
	},
	{
	  "type": "move_turtlebot_distance",
	  "message0": "Move turtlebot by a distance of: %1",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "Distance",
		  "align": "RIGHT"
		}
	  ],
	  "inputsInline": true,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 230,
	  "tooltip": "negative = backwards, positive= forwards",
	  "helpUrl": ""
	},
	{
	  "type": "turn_turtle",
	  "message0": "Turn Turtlebot %1 %2",
	  "args0": [
		{
		  "type": "field_dropdown",
		  "name": "Direction",
		  "options": [
			[
			  "Left",
			  "LEFT"
			],
			[
			  "Right",
			  "RIGHT"
			]
		  ]
		},
		{
		  "type": "input_dummy",
		  "name": "Direction",
		  "align": "RIGHT"
		},
	  ],
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 225,
	  "tooltip": "Turtlebot turns at 45 deg/s",
	  "helpUrl": ""
	},
	{
	  "type": "turn_turtle_angle",
	  "message0": "Turn Turtlebot %1 %2 For an angle of  %3 %4",
	  "args0": [
		{
		  "type": "field_dropdown",
		  "name": "direction",
		  "options": [
			[
			  "Left",
			  "LEFT"
			],
			[
			  "Right",
			  "RIGHT"
			]
		  ]
		},
		{
		  "type": "input_dummy",
		  "name": "Direction"
		},
		{
		  "type": "field_angle",
		  "name": "angle",
		  "angle": 90
		},
		{
		  "type": "input_dummy",
		  "name": "Angle"
		}
	  ],
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 230,
	  "tooltip": "Turn the turtlebot for some angle",
	  "helpUrl": ""
	},
	{
	  "type": "angle_obstacle",
	  "message0": "Check for obstacles at  %1 Degrees",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "angle",
		  "check": [
		    "Number",
			"Variable"
		  ],			
		  "align": "RIGHT",
		},

	  ],
	  "inputsInline": true,
	  "output": null,
	  "colour": 300,
	  "tooltip": "-90° - Right of turtlebot, 0° - Front of turtlebot, 90° - Left of turtlebot, Range of LIDAR is 0.2-3.5m, returns a list [True/False, distance]",
	  "helpUrl": ""
	},
	{
	  "type": "get_goal_coords",
	  "message0": "Get goal Coordinates",
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 20,
	  "tooltip": "Saves x, y coordinates of the goal",
	  "helpUrl": ""
	},
	{
	  "type": "get_own_coords",
	  "message0": "Get own coordinates",
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 20,
	  "tooltip": "Saves x,y coordinates of the turtlebot",
	  "helpUrl": ""
	},
	{
	  "type": "face_goal",
	  "message0": "Turn to face the goal",
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 20,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "get_goal_distance",
	  "message0": "Get distance to goal",
	  "output": "Number",
	  "colour": 20,
	  "tooltip": "Returns the straight line distance to the goal as a float",
	  "helpUrl": ""
	},
	{
	  "type": "line_of_sight",
	  "message0": "Check for line of sight",
	  "output": null,
	  "colour": 20,
	  "tooltip": "Returns true if there are no obstacles detected and false otherwise",
	  "helpUrl": ""
	},
	{
	  "type": "add_checkpoint",
	  "message0": "Add checkpoint",
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 120,
	  "tooltip": "Saves current coordinates as a checkpoint",
	  "helpUrl": ""
	},
	{
	  "type": "remove_checkpoint",
	  "message0": "Remove last checkpoint",
	  "inputsInline": false,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 120,
	  "tooltip": "Removes the last checkpoint",
	  "helpUrl": ""
	},
	{
	  "type": "go_to_prev_checkpoint",
	  "message0": "Go to last checkpoint",
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 120,
	  "tooltip": "Robot moves in a straight line to the previous checkpoint",
	  "helpUrl": ""
	},
	{
	  "type": "goal_x",
	  "message0": "Goal X-Coordinate ",
	  "output": null,
	  "colour": 330,
	  "tooltip": "Returns saved X-coordinate of goal",
	  "helpUrl": ""
	},
	{
	  "type": "goal_y",
	  "message0": "Goal Y-Coordinate ",
	  "output": null,
	  "colour": 330,
	  "tooltip": "Returns saved Y-coordinate of goal",
	  "helpUrl": ""
	},
	{
	  "type": "own_x",
	  "message0": "Own X-Coordinate ",
	  "output": null,
	  "colour": 330,
	  "tooltip": "Returns saved X-coordinate of turtlebot",
	  "helpUrl": ""
	},
	{
	  "type": "own_y",
	  "message0": "Own Y-Coordinate ",
	  "output": null,
	  "colour": 330,
	  "tooltip": "Returns saved own Y-coordinate of goal",
	  "helpUrl": ""
	},
	{
	  "type": "constrained_number",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_number",
		  "name": "NAME",
		  "value": 0,
		  "min": -90,
		  "max": 90,
		  "precision": 1,
		}
	  ],
	  "output": null,
	  "colour": 230,
	  "tooltip": "",
	  "helpUrl": ""
	},
	
	{
	  "type": "is_at_goal",
	  "message0": "Check if turtlebot is at goal",
	  "output": null,
	  "colour": 330,
	  "tooltip": "Returns True if the robot has reached the goal and False otherwise",
	  "helpUrl": ""
	},
	
	{
	  "type": "left_sensor",
	  "message0": "Object on left",
	  "output": null,
	  "colour": 45,
	  "tooltip": "If there is an object 90 degrees to the left returns the distance, otherwise returns \"inf\" if nothing is detected",
	  "helpUrl": ""
	},
	
	{
	  "type": "right_sensor",
	  "message0": "Object on right",
	  "output": null,
	  "colour": 45,
	  "tooltip": "If there is an object 90 degrees to the right returns the distance, otherwise returns \"inf\" if nothing is detected",
	  "helpUrl": ""
	},
	
	{
	  "type": "front_sensor",
	  "message0": "Object in front",
	  "output": null,
	  "colour": 45,
	  "tooltip": "If there is an object 90 degrees in front returns the distance, otherwise returns \"inf\" if nothing is detected",
	  "helpUrl": ""
	},

]); // END JSON EXTRACT
