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
 * @fileoverview Generating VBA for text blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.VBA.texts');

goog.require('Blockly.VBA');


Blockly.VBA['text'] = function(block) {
  // Text value.
  var code = Blockly.VBA.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  //Should we allow joining by '-' or ',' or any other characters?
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.VBA.ORDER_ATOMIC];
      break;
    case 1:
      var element = Blockly.VBA.valueToCode(block, 'ADD0',
              Blockly.VBA.ORDER_NONE) || '\'\'';
      var code = 'CStr(' + element + ')';
      return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
      break;
    case 2:
      var element0 = Blockly.VBA.valueToCode(block, 'ADD0',
              Blockly.VBA.ORDER_NONE) || '\'\'';
      var element1 = Blockly.VBA.valueToCode(block, 'ADD1',
              Blockly.VBA.ORDER_NONE) || '\'\'';
      var code = 'CStr(' + element0 + ') & CStr(' + element1 + ')';
      return [code, Blockly.VBA.ORDER_ADDITIVE];
      break;
    default:
      var elements = [];
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.VBA.valueToCode(block, 'ADD' + i,
                Blockly.VBA.ORDER_NONE) || '\'\'';
      }
      var tempVar = Blockly.VBA.variableDB_.getDistinctName('x',
          Blockly.Variables.NAME_TYPE);
      var code = '\'\'.join([CStr(" + tempVar + ") for ' + tempVar + ' in [' +
          elements.join(', ') + ']])';
      return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
  }
};

Blockly.VBA['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.VBA.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var value = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  return varName + ' = str(' + varName + ') + str(' + value + ')\n';
};

Blockly.VBA['text_length'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.VBA.valueToCode(block, 'VALUE',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  return ['len(' + text + ')', Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.VBA.valueToCode(block, 'VALUE',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  var code = 'not len(' + text + ')';
  return [code, Blockly.VBA.ORDER_LOGICAL_NOT];
};

Blockly.VBA['text_indexOf'] = function(block) {
  // Search the text for a substring.
  // Should we allow for non-case sensitive???
  var operator = block.getFieldValue('END') == 'FIRST' ? 'find' : 'rfind';
  var substring = Blockly.VBA.valueToCode(block, 'FIND',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  var text = Blockly.VBA.valueToCode(block, 'VALUE',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.VBA.ORDER_ADDITIVE];
  }
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var text = Blockly.VBA.valueToCode(block, 'VALUE',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = 'Left(' + text + ', 1)';
      return [code, Blockly.VBA.ORDER_ATOMIC];
    case 'LAST':
      var code = 'Right(' + text + ', 1)';
      return [code, Blockly.VBA.ORDER_ATOMIC];
    case 'FROM_START':
      var at = Blockly.VBA.valueToCode(block, 'AT', Blockly.VBA.ORDER_NONE);
      var code = 'Left(' + text + ', ' + at + ')';
      return [code, Blockly.VBA.ORDER_ATOMIC];
    case 'FROM_END':
      var at = Blockly.VBA.valueToCode(block, 'AT', Blockly.VBA.ORDER_NONE);
      var code = 'Right(' + text + ', ' + at + ')';
      return [code, Blockly.VBA.ORDER_ATOMIC];
    case 'RANDOM':
      Blockly.VBA.definitions_['import_random'] = 'import random';
      var functionName = Blockly.VBA.provideFunction_(
          'text_random_letter',
          ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(text):',
           '  x = int(random.random() * len(text))',
           '  return text[x];']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.VBA['text_getSubstring'] = function(block) {
  // Get substring.
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var text = Blockly.VBA.valueToCode(block, 'STRING',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.VBA.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.VBA.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '';
      break;
    default:
      throw 'Unhandled option (text_getSubstring)';
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.VBA.getAdjustedInt(block, 'AT2', 1);
      break;
    case 'FROM_END':
      var at2 = Blockly.VBA.getAdjustedInt(block, 'AT2', 0, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.VBA.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '';
      break;
    default:
      throw 'Unhandled option (text_getSubstring)';
  }
  var code = text + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.VBA.ORDER_MEMBER];
};

Blockly.VBA['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': 'vbUpperCase',
    'LOWERCASE': 'vbLowerCase',
    'TITLECASE': '.vbProperCase'
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var text = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var code = 'StrConv(' + text + ', ' + operator + ')\n';
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': 'LTrim(',
    'RIGHT': 'RTrim(',
    'BOTH': 'Trim('
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var code = operator + text + ')\n';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  return 'print(' + msg + ')\n';
};

Blockly.VBA['text_prompt_ext'] = function(block) {
  // Prompt function.
  var functionName = Blockly.VBA.provideFunction_(
      'text_prompt',
      ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(msg):',
       '  try:',
       '    return raw_input(msg)',
       '  except NameError:',
       '    return input(msg)']);
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.VBA.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.VBA.valueToCode(block, 'TEXT',
        Blockly.VBA.ORDER_NONE) || '\'\'';
  }
  var code = functionName + '(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'float(' + code + ')';
  }
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['text_prompt'] = Blockly.VBA['text_prompt_ext'];

Blockly.VBA['text_count'] = function(block) {
  var text = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.VBA.valueToCode(block, 'SUB',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  var code = text + '.count(' + sub + ')';
  return [code, Blockly.VBA.ORDER_MEMBER];
};

Blockly.VBA['text_replace'] = function(block) {
  var text = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var from = Blockly.VBA.valueToCode(block, 'FROM',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  var to = Blockly.VBA.valueToCode(block, 'TO',
      Blockly.VBA.ORDER_NONE) || '\'\'';
  var code = text + '.replace(' + from + ', ' + to + ')';
  return [code, Blockly.VBA.ORDER_MEMBER];
};

Blockly.VBA['text_reverse'] = function(block) {
  var text = Blockly.VBA.valueToCode(block, 'TEXT',
      Blockly.VBA.ORDER_MEMBER) || '\'\'';
  var code = 'StrReverse(' + text + ')';
  return [code, Blockly.VBA.ORDER_MEMBER];
};
