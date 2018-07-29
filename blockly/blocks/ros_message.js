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
 * @fileoverview ROS messages blocks for Blockly.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Blocks.rosmessage'); // Deprecated
goog.provide('Blockly.Constants.RosMessage');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.ROS_MESSAGE_HUE.
 * @readonly
 */
Blockly.Constants.RosMessage.HUE = 200;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block to set value to "Int32" message
  {
    "type": "ros_message_std_msgs_int32",
    "message0": "set std_msgs/int32 %1",
    "args0": [{
      "type": "input_value",
      "name": "INT32",
      "check": "Number"
    }],
    "output": null,
    "colour": "%{BKY_ROS_MESSAGE_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to set value to "String" message
  {
    "type": "ros_message_std_msgs_string",
    "message0": "set std_msg/string %1",
    "args0": [{
      "type": "input_value",
      "name": "STRING",
      "check": "String"
    }],
    "output": null,
    "colour": "%{BKY_ROS_MESSAGE_HUE}",
    "tooltip": "",
    "helpUrl": "http://docs.ros.org/api/std_msgs/html/msg/String.html"
  },
  // Block to set value to "twist" message
  {
    "type": "ros_message_geometry_msgs_twist",
    "message0": "set geometry_msgs/twist %1 linear x %2 linear y %3 linear z %4 angular x %5 angular y %6 angular z %7",
    "args0": [{
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "LINEAR_X",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "LINEAR_Y",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "LINEAR_Z",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "ANGULAR_X",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "ANGULAR_Y",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "ANGULAR_Z",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_MESSAGE_HUE}",
    "tooltip": "",
    "helpUrl": "http://docs.ros.org/api/geometry_msgs/html/msg/Twist.html"
  },
  // Block to get attributes of Point message
  {
  "type": "get_point",
  "message0": "from geometry_msgs/Point  %1 get attribute %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "POINT",
      "variable": "item"
    },
    {
      "type": "field_dropdown",
      "name": "ATT",
      "options": [
        [
          "x",
          "x"
        ],
        [
          "y",
          "y"
        ],
        [
          "z",
          "z"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "%{BKY_ROS_MESSAGE_HUE}",
  "tooltip": "",
  "helpUrl": "http://docs.ros.org/api/geometry_msgs/html/msg/Point.html"
  }, 
  // Block to get attributes of Twist message
  {
  "type": "get_twist",
  "message0": "from geometry_msgs/Twist %1 get attribute %2 %3",
  "args0": [
    {
      "type": "field_variable",
      "name": "TWIST",
      "variable": "item"
    },
    {
      "type": "field_dropdown",
      "name": "ATT1",
      "options": [
        [
          "angular",
          "angular"
        ],
        [
          "linear",
          "linear"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "ATT2",
      "options": [
        [
          "x",
          "x"
        ],
        [
          "y",
          "y"
        ],
        [
          "z",
          "z"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "%{BKY_ROS_MESSAGE_HUE}",
  "tooltip": "",
  "helpUrl": "http://docs.ros.org/api/geometry_msgs/html/msg/Twist.html"
  }
]); // END JSON EXTRACT (Do not delete this comment.)