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
 * @fileoverview ROS robot selection blocks for Blockly.
 * @author karl@inrovo.com (Karl Li)
 */
'use strict';

goog.provide('Blockly.Blocks.rosrobot'); // Deprecated
goog.provide('Blockly.Constants.RosRobot');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.ROS_ROBOT_HUE.
 * @readonly
 */
Blockly.Constants.RosRobot.HUE = 240;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // Block to select bb8 as robot
    {
        "type": "ros_robot_bb8",
        "message0": "%1 bb8",
        "args0": [{
            "type": "field_image",
            "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
            "width": 15,
            "height": 15,
            "alt": "bb8"
        }],
        "output": "String",
        "colour": "%{BKY_ROS_ROBOT_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    // Block to select turtlebot3 as robot
    {
        "type": "ros_robot_turtlebot3",
        "message0": "%1 turtlebot",
        "args0": [{
            "type": "field_image",
            "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
            "width": 15,
            "height": 15,
            "alt": "turtlebot3"
        }],
        "output": "String",
        "colour": "%{BKY_ROS_ROBOT_HUE}",
        "tooltip": "",
        "helpUrl": ""
    }
]); // END JSON EXTRACT (Do not delete this comment.)