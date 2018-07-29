/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating Python for ROS mobile robot blocks.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Python.rosmobile');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords();

Blockly.Python['ros_mobile_move_circle'] = function (block) {
  // Make robot move in a circle
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var dropdown_speed = block.getFieldValue('SPEED');
  var code = variable_robot + '.move_circle(\'' + dropdown_direction + '\', \'' + dropdown_speed + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_move_forward'] = function (block) {
  // Make robot move forward
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var dropdown_speed = block.getFieldValue('SPEED');
  var code = variable_robot + '.move_forward(\'' + dropdown_speed + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_move_backward'] = function (block) {
  // Make robot move backward
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var number_duration = block.getFieldValue('DURATION');
  var dropdown_speed = block.getFieldValue('SPEED');
  var code = variable_robot + '.move_backward(\'' + dropdown_speed + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_turn_left'] = function (block) {
  // Make robot turn left
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var number_duration = block.getFieldValue('DURATION');
  var dropdown_speed = block.getFieldValue('SPEED');
  var code = variable_robot + '.turn_left(\'' + dropdown_speed + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_turn_right'] = function (block) {
  // Make robot turn right
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var number_duration = block.getFieldValue('DURATION');
  var dropdown_speed = block.getFieldValue('SPEED');
  var code = variable_robot + '.turn_right(\'' + dropdown_speed + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_turn_degree'] = function (block) {
  // Make robot turn at an angle
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var number_angle = block.getFieldValue('ANGLE');
  var code = variable_robot + '.turn_right(\'' + dropdown_direction + '\', \'' + number_angle + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_stop'] = function (block) {
  // Make robot stop
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var code = variable_robot + '.stop()\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_rotate_axis'] = function (block) {
  // Make robot rotate about axis
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var dropdown_name = block.getFieldValue('NAME');
  var code = variable_robot + '.rotate_about_axis(\'' + dropdown_direction + '\', \'' + dropdown_name + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_mobile_rotate_head'] = function (block) {
  var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = variable_robot + '.rotate_head(\'' + dropdown_direction + '\')\n';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};