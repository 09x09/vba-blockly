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
 * @fileoverview Generating VBA for loop blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.VBA.loops');

goog.require('Blockly.VBA');


Blockly.VBA['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(parseInt(block.getFieldValue('TIMES'), 10));
  } else {
    // External number.
    var repeats = Blockly.VBA.valueToCode(block, 'TIMES',
        Blockly.VBA.ORDER_NONE) || '0';
  }
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = 'int(' + repeats + ')';
  }
  var branch = Blockly.VBA.statementToCode(block, 'DO');
  branch = Blockly.VBA.addLoopTrap(branch, block.id) ||
      Blockly.VBA.PASS;
  var loopVar = Blockly.VBA.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  Blockly.VBA.definitions_[loopVar] = 'Dim ' + loopVar + ' As Integer';
  var code = 'For ' + loopVar + ' = 1 to ' + repeats + '\n' + branch;
  return code + 'Next ' + loopVar + '\n';
};

Blockly.VBA['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.VBA.valueToCode(block, 'BOOL',
      until ? Blockly.VBA.ORDER_LOGICAL_NOT :
      Blockly.VBA.ORDER_NONE) || 'False';
  var branch = Blockly.VBA.statementToCode(block, 'DO');
  branch = Blockly.VBA.addLoopTrap(branch, block.id) ||
      Blockly.VBA.PASS;
  if (until) {
    argument0 = 'not ' + argument0;
  }
  return 'Do While ' + argument0 + '\n' + branch + '\nLoop';
};

Blockly.VBA['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.VBA.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.VBA.valueToCode(block, 'FROM',
      Blockly.VBA.ORDER_NONE) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'TO',
      Blockly.VBA.ORDER_NONE) || '0';
  var increment = Blockly.VBA.valueToCode(block, 'BY',
      Blockly.VBA.ORDER_NONE) || '1';
  var branch = Blockly.VBA.statementToCode(block, 'DO');
  branch = Blockly.VBA.addLoopTrap(branch, block.id) ||
      Blockly.VBA.PASS;

  var code = '';
  var range;

  // Helper functions.
  var defineUpRange = function() {
    return Blockly.VBA.provideFunction_(
        'upRange',
        ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ +
            '(start, stop, step):',
         '  while start <= stop:',
         '    yield start',
         '    start += abs(step)']);
  };
  var defineDownRange = function() {
    return Blockly.VBA.provideFunction_(
        'downRange',
        ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ +
            '(start, stop, step):',
         '  while start >= stop:',
         '    yield start',
         '    start -= abs(step)']);
  };
  // Arguments are legal VBA code (numbers or strings returned by scrub()).
  var generateUpDownRange = function(start, end, inc) {
    return '(' + start + ' <= ' + end + ') and ' +
        defineUpRange() + '(' + start + ', ' + end + ', ' + inc + ') or ' +
        defineDownRange() + '(' + start + ', ' + end + ', ' + inc + ')';
  };

  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All parameters are simple numbers.
    argument0 = parseFloat(argument0);
    argument1 = parseFloat(argument1);
    increment = Math.abs(parseFloat(increment));
    if (argument0 % 1 === 0 && argument1 % 1 === 0 && increment % 1 === 0) {
      // All parameters are integers.
      if (argument0 <= argument1) {
        // Count up.
        argument1++;
        if (argument0 == 0 && increment == 1) {
          // If starting index is 0, omit it.
          range = argument1;
        } else {
          range = argument0 + ', ' + argument1;
        }
        // If increment isn't 1, it must be explicit.
        if (increment != 1) {
          range += ', ' + increment;
        }
      } else {
        // Count down.
        argument1--;
        range = argument0 + ', ' + argument1 + ', -' + increment;
      }
      range = 'range(' + range + ')';
    } else {
      // At least one of the parameters is not an integer.
      if (argument0 < argument1) {
        range = defineUpRange();
      } else {
        range = defineDownRange();
      }
      range += '(' + argument0 + ', ' + argument1 + ', ' + increment + ')';
    }
  } else {
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var scrub = function(arg, suffix) {
      if (Blockly.isNumber(arg)) {
        // Simple number.
        arg = parseFloat(arg);
      } else if (arg.match(/^\w+$/)) {
        // Variable.
        arg = 'float(' + arg + ')';
      } else {
        // It's complicated.
        var varName = Blockly.VBA.variableDB_.getDistinctName(
            variable0 + suffix, Blockly.Variables.NAME_TYPE);
        code += varName + ' = float(' + arg + ')\n';
        arg = varName;
      }
      return arg;
    };
    var startVar = scrub(argument0, '_start');
    var endVar = scrub(argument1, '_end');
    var incVar = scrub(increment, '_inc');

    if (typeof startVar == 'number' && typeof endVar == 'number') {
      if (startVar < endVar) {
        range = defineUpRange(startVar, endVar, increment);
      } else {
        range = defineDownRange(startVar, endVar, increment);
      }
    } else {
      // We cannot determine direction statically.
      range = generateUpDownRange(startVar, endVar, increment);
    }
  }
  code += 'for ' + variable0 + ' in ' + range + ':\n' + branch;
  return code;
};

Blockly.VBA['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.VBA.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.VBA.valueToCode(block, 'LIST',
      Blockly.VBA.ORDER_RELATIONAL) || '[]';
  var branch = Blockly.VBA.statementToCode(block, 'DO');
  branch = Blockly.VBA.addLoopTrap(branch, block.id) ||
      Blockly.VBA.PASS;
  var code = 'for ' + variable0 + ' in ' + argument0.trim() + ':\n' + branch;
  return code;
};

Blockly.VBA['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break\n';
    case 'CONTINUE':
      return 'continue\n';
  }
  throw 'Unknown flow statement.';
};
