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
 * @fileoverview Generating Python for ROS basic blocks.
 * @author karl@inrovo.com (Karl Li)
 * @author shady@inrovo.com (Shady)
 */
'use strict';

goog.provide('Blockly.Python.rosbasic');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords();

Blockly.Python['ros_basic_init_node'] = function (block) {
  // Initialize a new ROS node
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var text_node_name = block.getFieldValue('NODE_NAME');
  var code = `rospy.init_node('${text_node_name}', anonymous=True)\n`;
  return code;
};

Blockly.Python['ros_basic_set_rate'] = function (block) {
  // Set rospy.Rate()
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var number_frequency = block.getFieldValue('FREQUENCY');
  var code = `rospy.Rate(${number_frequency})\n`
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_basic_is_shutdown'] = function (block) {
  // Return if CTRL-C is pressed
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var code = `rospy.is_shutdown()`
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_basic_sleep'] = function (block) {
  // Set rospy.sleep()
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var value_rate = Blockly.Python.valueToCode(block, 'RATE', Blockly.Python.ORDER_NONE);
  var code = `${value_rate}.sleep()\n`;
  return code;
};

Blockly.Python['ros_basic_set_publisher'] = function (block) {
  // Create new ROS publisher
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var text_topic_name = block.getFieldValue('TOPIC_NAME');
  var dropdown_message_type = block.getFieldValue('MESSAGE_TYPE');
  var number_queue_size = block.getFieldValue('QUEUE_SIZE');
  switch (dropdown_message_type) {
    case 'INT32':
      Blockly.Python.definitions_['from_std_msgs_import_string'] = 'from std_msgs.msg import Int32';
      dropdown_message_type = 'Int32';
      break;
    case 'STRING':
      Blockly.Python.definitions_['from_std_msgs_import_string'] = 'from std_msgs.msg import String';
      dropdown_message_type = 'String';
      break;
    case 'TWIST':
      Blockly.Python.definitions_['from_geometry_msgs_import_twist'] = 'from geometry_msgs.msg import Twist';
      dropdown_message_type = 'Twist';
      break;
  }
  var code = `rospy.Publisher('${text_topic_name}', ${dropdown_message_type}, queue_size=${number_queue_size})\n`
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ros_basic_publish'] = function (block) {
  // Publish message using publisher
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var variable_message_name = Blockly.Python.variableDB_.getName(block.getFieldValue('MESSAGE_NAME'), Blockly.Variables.NAME_TYPE);
  var variable_publisher_name = Blockly.Python.variableDB_.getName(block.getFieldValue('PUBLISHER_NAME'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_publisher_name}.publish(${variable_message_name})\n`;
  return code;
};

Blockly.Python['ros_basic_publish_time'] = function (block) {
  // Publish message using publisher
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  Blockly.Python.definitions_['import_blockly_pkg.blockly'] = 'import blockly_pkg.blockly as Blockly';
  var variable_message_name = Blockly.Python.variableDB_.getName(block.getFieldValue('MESSAGE_NAME'), Blockly.Variables.NAME_TYPE);
  var variable_publisher_name = Blockly.Python.variableDB_.getName(block.getFieldValue('PUBLISHER_NAME'), Blockly.Variables.NAME_TYPE);
  var number_duration = block.getFieldValue('DURATION');
  var code = `Blockly.Basic.publish_time(${variable_publisher_name}, ${variable_message_name}, ${number_duration})\n`;
  return code;
};

Blockly.Python['ros_basic_log'] = function(block) {
  Blockly.Python.definitions_['import_rospy'] = 'import rospy';
  var value_info = Blockly.Python.valueToCode(block, 'INFO', Blockly.Python.ORDER_ATOMIC);
  var code = 'rospy.loginfo(' + value_info.trim() +')\n';
  return code;
};