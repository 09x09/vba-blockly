'use strict';

goog.provide('Blockly.Python.turtlebot3');

goog.require('Blockly.Python');

Blockly.Python['init_turtle'] = function(block) {
  Blockly.Python.definitions_['import rospy'] = 'import rospy'
  Blockly.Python.definitions_['import turtle3'] = 'import turtle3'
  var code = `turtle = turtle3.Turtle()\n`;
  return code;
};

Blockly.Python['move_turtlebot'] = function(block) {
  var dropdown_opt_direction = block.getFieldValue('Opt_Direction');
  var value_direction = Blockly.Python.valueToCode(block, 'Direction', Blockly.Python.ORDER_ATOMIC);
  var dropdown_opt_speed = block.getFieldValue('Opt_Speed');
  var value_speed = Blockly.Python.valueToCode(block, 'Speed', Blockly.Python.ORDER_ATOMIC);
  var code = `turtle.moveTurtle('${dropdown_opt_direction}', '${dropdown_opt_speed}')\n`;
  return code;
};

Blockly.Python['move_turtlebot_distance'] = function(block) {
  var value_distance = Blockly.Python.valueToCode(block, 'Distance', Blockly.Python.ORDER_FUNCTION_CALL);
  var code = `turtle.moveDistanceTurtle(${value_distance.trim()})\n`;
  return code;
};

Blockly.Python['turn_turtle'] = function(block) {
  var dropdown_direction = block.getFieldValue('Direction');
  var value_direction = Blockly.Python.valueToCode(block, 'Direction', Blockly.Python.ORDER_ATOMIC);
  var code = `turtle.turnTurtle('${dropdown_direction}')\n`;
  return code;
};

Blockly.Python['turn_turtle_angle'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_direction = Blockly.Python.valueToCode(block, 'Direction', Blockly.Python.ORDER_ATOMIC);
  var angle_angle = block.getFieldValue('angle');
  var value_angle = Blockly.Python.valueToCode(block, 'Angle', Blockly.Python.ORDER_ATOMIC);

  var code = `turtle.turnTurtleAngle('${dropdown_direction}', ${angle_angle}, "deg")\n`;
  return code;
};

Blockly.Python['angle_obstacle'] = function(block) {	
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var code = `turtle.angleObstacle(${value_angle})\n`;
  return [code,Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['get_goal_coords'] = function(block) {
  var code = `turtle.getGoalCoords()\n`;
  return [code,Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['get_own_coords'] = function(block) {
  var code = `turtle.getOwnCoords()\n`;
  return code;
};

Blockly.Python['face_goal'] = function(block) {
  var code = `turtle.faceGoal()\n`;
  return code;
};

Blockly.Python['get_goal_distance'] = function(block) {
  var code = `turtle.getGoalDistance()\n`;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['line_of_sight'] = function(block) {
  var code = `turtle.lineOfSight()\n`;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['add_checkpoint'] = function(block) {
  var code = `turtle.addCheckpoint()\n`;
  return code;
};

Blockly.Python['remove_checkpoint'] = function(block) {
  var code = `turtle.removeLastCheckpoint()\n`;
  return code;
};

Blockly.Python['go_to_prev_checkpoint'] = function(block) {
  var code = `turtle.goToPrevCheckpoint()\n`;
  return code;
};

Blockly.Python['goal_x'] = function(block) {
  var code = `turtle.goal_coords.x\n`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['goal_y'] = function(block) {
  var code = `turtle.goal_coords.y\n`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['own_x'] = function(block) {
  var code = `turtle.coords.x\n`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['own_y'] = function(block) {
  var code = `turtle.coords.y\n`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['is_at_goal'] = function(block) {
  var code = `turtle.isAtGoal()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['left_sensor'] = function(block) {
  var code = `turtle.leftSensor()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['right_sensor'] = function(block) {
  var code = `turtle.rightSensor()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['front_sensor'] = function(block) {
  var code = `turtle.frontSensor()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// shadow block to regulate angle_obstacle block
Blockly.Python['constrained_number'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  var code = number_name;
  return [code, Blockly.Python.ORDER_ATOMIC];
};