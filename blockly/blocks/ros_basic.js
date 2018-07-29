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
 * @fileoverview ROS basic blocks for Blockly.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Blocks.rosbasic'); // Deprecated
goog.provide('Blockly.Constants.RosBasic');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.ROS_BASIC_HUE.
 * @readonly
 */
Blockly.Constants.RosBasic.HUE = 180;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block initizing a new ROS node
  {
    "type": "ros_basic_init_node",
    "message0": "create new node %1",
    "args0": [{
      "type": "field_input",
      "name": "NODE_NAME",
      "text": "node_name"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to set rate at which the node does something
  {
    "type": "ros_basic_set_rate",
    "message0": "action rate of %1 hertz",
    "args0": [{
      "type": "field_number",
      "name": "FREQUENCY",
      "value": 2
    }],
    "output": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to capture CTRL-C on keyboard
  {
    "type": "ros_basic_is_shutdown",
    "message0": "ctrl-c pressed",
    "output": "Boolean",
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to set the program to sleep before next trigger 
  {
    "type": "ros_basic_sleep",
    "message0": "sleep at %1",
    "args0": [{
      "type": "input_value",
      "name": "RATE",
      "check": "Variable"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to set a publisher parameters
  {
    "type": "ros_basic_set_publisher",
    "message0": "publish topic %1 message type %2 queue size %3",
    "args0": [{
        "type": "field_input",
        "name": "TOPIC_NAME",
        "text": "topic_name"
      },
      {
        "type": "field_dropdown",
        "name": "MESSAGE_TYPE",
        "options": [
          ["int32", "INT32"],
          ["string", "STRING"],
          ["twist", "TWIST"]
        ]
      },
      {
        "type": "field_number",
        "name": "QUEUE_SIZE",
        "value": 3
      }
    ],
    "output": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to publish to a topic
  {
    "type": "ros_basic_publish",
    "message0": "publish %1 using %2",
    "args0": [{
        "type": "field_variable",
        "name": "MESSAGE_NAME",
        "variable": "message"
      },
      {
        "type": "field_variable",
        "name": "PUBLISHER_NAME",
        "variable": "publisher"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  // Block to publish to a topic for a certain period of time
  {
    "type": "ros_basic_publish_time",
    "message0": "publish %1 using %2 for %3 seconds",
    "args0": [{
        "type": "field_variable",
        "name": "MESSAGE_NAME",
        "variable": "message"
      },
      {
        "type": "field_variable",
        "name": "PUBLISHER_NAME",
        "variable": "publisher"
      },
      {
        "type": "field_number",
        "name": "DURATION",
        "value": 5
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROS_BASIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  },
  {
  "type": "ros_basic_log",
  "message0": "ROS log to console %1",
  "args0": [
    {
      "type": "input_value",
      "name": "INFO"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_ROS_BASIC_HUE}",
  "tooltip": "helpful for debugging",
  "helpUrl": ""
}
]); // END JSON EXTRACT (Do not delete this comment.)