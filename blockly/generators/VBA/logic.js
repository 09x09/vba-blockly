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
 * @fileoverview Generating VBA for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.VBA.logic');

goog.require('Blockly.VBA');


Blockly.VBA['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.VBA.valueToCode(block, 'IF' + n,
        Blockly.VBA.ORDER_NONE) || 'False';
    branchCode = Blockly.VBA.statementToCode(block, 'DO' + n) ||
        Blockly.VBA.PASS;
    code += (n == 0 ? 'If ' : 'Else If ' ) + conditionCode + ' Then\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.VBA.statementToCode(block, 'ELSE') ||
        Blockly.VBA.PASS;
    code += 'Else\n' + branchCode;
  }
  
  code += 'End If';
  return code;
};

Blockly.VBA['controls_ifelse'] = Blockly.VBA['controls_if'];

Blockly.VBA['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '<>',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.VBA.ORDER_RELATIONAL;
  var argument0 = Blockly.VBA.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'B', order) || '0';
  var code = argument0.trim() + ' ' + operator + ' ' + argument1.trim();
  return [code, order];
};

Blockly.VBA['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.VBA.ORDER_LOGICAL_AND :
      Blockly.VBA.ORDER_LOGICAL_OR;
  var argument0 = Blockly.VBA.valueToCode(block, 'A', order);
  var argument1 = Blockly.VBA.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'True' : 'False';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0.trim() + ' ' + operator + ' ' + argument1.trim();
  return [code, order];
};

Blockly.VBA['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.VBA.valueToCode(block, 'BOOL',
      Blockly.VBA.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.VBA.ORDER_LOGICAL_NOT];
};

Blockly.VBA['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.VBA.valueToCode(block, 'IF',
      Blockly.VBA.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.VBA.valueToCode(block, 'THEN',
      Blockly.VBA.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.VBA.valueToCode(block, 'ELSE',
      Blockly.VBA.ORDER_CONDITIONAL) || 'None';
  var code = value_then + ' if ' + value_if + ' else ' + value_else;
  return [code, Blockly.VBA.ORDER_CONDITIONAL];
};
