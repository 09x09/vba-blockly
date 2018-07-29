/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview ROS mobile robot blocks for Blockly.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Blocks.rosmobile'); // Deprecated
goog.provide('Blockly.Constants.RosMobile');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.ROS_MOBILE_HUE.
 * @readonly
 */
Blockly.Constants.RosMobile.HUE = 220;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block for robot to move in a circle
  {
    "type": "ros_mobile_move_circle",
    "message0": "%1 circle %2 at %3 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["clockwise", "CLOCKWISE"],
          ["counter-clockwise", "COUNTER-CLOCKWISE"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "SPEED",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to move forward
  {
    "type": "ros_mobile_move_forward",
    "message0": "%1 move forward at %2 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "SPEED",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to move backward
  {
    "type": "ros_mobile_move_backward",
    "message0": "%1 move backward at %2 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "SPEED",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to turn left
  {
    "type": "ros_mobile_turn_left",
    "message0": "%1 turn left at %2 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "SPEED",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to turn right
  {
    "type": "ros_mobile_turn_right",
    "message0": "%1 turn right at %2 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "SPEED",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to turn at an angle
  {
    "type": "ros_mobile_turn_degree",
    "message0": "%1 turn %2 at %3 degrees",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["left", "LEFT"],
          ["right", "RIGHT"]
        ]
      },
      {
        "type": "field_number",
        "name": "ANGLE",
        "value": 90
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to stop
  {
    "type": "ros_mobile_stop",
    "message0": "stop %1",
    "args0": [{
      "type": "field_variable",
      "name": "ROBOT",
      "variable": "robot"
    }],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to rotate about axis
  {
    "type": "ros_mobile_rotate_axis",
    "message0": "%1 rotate %2 at %3 speed",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["clockwise", "CLOCKWISE"],
          ["counter-clockwise", "COUNTER-CLOCKWISE"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          ["slow", "SLOW"],
          ["normal", "NORMAL"],
          ["fast", "FAST"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for robot to rotate head (applicable to BB8)
  {
    "type": "ros_mobile_rotate_head",
    "message0": "%1 rotate head %2",
    "args0": [{
        "type": "field_variable",
        "name": "ROBOT",
        "variable": "robot"
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["clockwise", "CLOCKWISE"],
          ["counter-clockwise", "COUNTER-CLOCKWISE"]
        ]
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MOBILE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  }
]); // END JSON EXTRACT (Do not delete this comment.)