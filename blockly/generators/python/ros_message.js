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
 * @fileoverview Generating Python for ROS messages blocks.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Python.rosmessage');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords();

Blockly.Python['ros_message_std_msgs_int32'] = function (block) {
  Blockly.Python.definitions_['from_std_msgs_import_int32'] = 'from std_msgs.msg import Int32';
  var value_int32 = Blockly.Python.valueToCode(block, 'INT32', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_int32}`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['ros_message_std_msgs_string'] = function (block) {
  // Set values to the message type "Twist"
  Blockly.Python.definitions_['from_std_msgs_import_string'] = 'from std_msgs.msg import String';
  var value_string = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_string}`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['ros_message_geometry_msgs_twist'] = function (block) {
  Blockly.Python.definitions_['from_geometry_msgs_import_twist'] = 'from geometry_msgs.msg import Twist';
  var value_linear_x = Blockly.Python.valueToCode(block, 'LINEAR_X', Blockly.Python.ORDER_ATOMIC);
  var value_linear_y = Blockly.Python.valueToCode(block, 'LINEAR_Y', Blockly.Python.ORDER_ATOMIC);
  var value_linear_z = Blockly.Python.valueToCode(block, 'LINEAR_Z', Blockly.Python.ORDER_ATOMIC);
  var value_angular_x = Blockly.Python.valueToCode(block, 'ANGULAR_X', Blockly.Python.ORDER_ATOMIC);
  var value_angular_y = Blockly.Python.valueToCode(block, 'ANGULAR_Y', Blockly.Python.ORDER_ATOMIC);
  var value_angular_z = Blockly.Python.valueToCode(block, 'ANGULAR_Z', Blockly.Python.ORDER_ATOMIC);
  var code = `Twist(Vector3(${value_linear_x}, ${value_linear_y}, ${value_linear_z}), Vector3(${value_angular_x}, ${value_angular_y}, ${value_angular_z}))\n`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['get_point'] = function(block) {
  Blockly.Python.definitions_['from_geometry_msgs_import_point'] = 'from geometry_msgs.msg import Point';
  var variable_point = Blockly.Python.variableDB_.getName(block.getFieldValue('POINT'), Blockly.Variables.NAME_TYPE);
  var dropdown_att = block.getFieldValue('ATT');
  var code = variable_point + '.' +  dropdown_att;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['get_twist'] = function(block) {
  Blockly.Python.definitions_['from_geometry_msgs_import_twist'] = 'from geometry_msgs.msg import Twist';
  var variable_twist = Blockly.Python.variableDB_.getName(block.getFieldValue('TWIST'), Blockly.Variables.NAME_TYPE);
  var dropdown_att1 = block.getFieldValue('ATT1');
  var dropdown_att2 = block.getFieldValue('ATT2');
  var code = variable_twist + '.' + dropdown_att1 + '.' + dropdown_att2;
  return [code, Blockly.Python.ORDER_ATOMIC];
};