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
 * @fileoverview Generating VBA for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.VBA.math');

goog.require('Blockly.VBA');


// If any new block imports any library, add that library name here.
Blockly.VBA.addReservedWords('math,random,Number');

Blockly.VBA['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'float("inf")';
    order = Blockly.VBA.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = '-float("inf")';
    order = Blockly.VBA.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? Blockly.VBA.ORDER_UNARY_SIGN :
            Blockly.VBA.ORDER_ATOMIC;
  }
  return [code, order];
};

Blockly.VBA['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.VBA.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.VBA.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.VBA.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.VBA.ORDER_MULTIPLICATIVE],
    'POWER': [' ^ ', Blockly.VBA.ORDER_EXPONENTIATION]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.VBA.valueToCode(block, 'A',  order) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'B',  order) || '0';
  var code = argument0.trim() + operator + argument1.trim();
  return [code, order];
};

Blockly.VBA['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    var code = Blockly.VBA.valueToCode(block, 'NUM',
        Blockly.VBA.ORDER_UNARY_SIGN) || '0';
    return ['-' + code, Blockly.VBA.ORDER_UNARY_SIGN];
  }
  Blockly.VBA.definitions_['import_math'] = 'import math';
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.VBA.valueToCode(block, 'NUM',
        Blockly.VBA.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.VBA.valueToCode(block, 'NUM',
        Blockly.VBA.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Sqr(' + arg + ')';
      break;
    case 'LN':
      code = 'WorksheetFunction.LN(' + arg + ')';
      break;
    case 'LOG10':
      code = '10 ^' + arg;
      break;
    case 'EXP':
      code = 'Exp(' + arg + ')';
      break;
    case 'POW10':
      code = '10 ^' + arg;
      break;
    case 'ROUND':
      code = 'Round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'WorksheetFunction.RoundUp(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'WorksheetFunction.RoundDown(' + arg + ')';
      break;
    case 'SIN':
      code = 'Sin(' + arg + ')';
      break;
    case 'COS':
      code = 'Cos(' + arg + ')';
      break;
    case 'TAN':
      code = 'Tan(' + arg + ')';
      break;
  }
  if (code) {
    return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'math.asin(' + arg + ') / math.pi * 180';
      break;
    case 'ACOS':
      code = 'math.acos(' + arg + ') / math.pi * 180';
      break;
    case 'ATAN':
      code = 'math.atan(' + arg + ') / math.pi * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.VBA.ORDER_MULTIPLICATIVE];
};

Blockly.VBA['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['math.pi', Blockly.VBA.ORDER_MEMBER],
    'E': ['math.e', Blockly.VBA.ORDER_MEMBER],
    'GOLDEN_RATIO': ['(1 + math.sqrt(5)) / 2',
                     Blockly.VBA.ORDER_MULTIPLICATIVE],
    'SQRT2': ['math.sqrt(2)', Blockly.VBA.ORDER_MEMBER],
    'SQRT1_2': ['math.sqrt(1.0 / 2)', Blockly.VBA.ORDER_MEMBER],
    'INFINITY': ['float(\'inf\')', Blockly.VBA.ORDER_ATOMIC]
  };
  var constant = block.getFieldValue('CONSTANT');
  if (constant != 'INFINITY') {
    Blockly.VBA.definitions_['import_math'] = 'import math';
  }
  return CONSTANTS[constant];
};

Blockly.VBA['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.VBA.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.VBA.ORDER_MULTIPLICATIVE) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    Blockly.VBA.definitions_['import_math'] = 'import math';
    Blockly.VBA.definitions_['from_numbers_import_Number'] =
        'from numbers import Number';
    var functionName = Blockly.VBA.provideFunction_(
        'math_isPrime',
        ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(n):',
         '  # https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
         '  # If n is not a number but a string, try parsing it.',
         '  if not isinstance(n, Number):',
         '    try:',
         '      n = float(n)',
         '    except:',
         '      return False',
         '  if n == 2 or n == 3:',
         '    return True',
         '  # False if n is negative, is 1, or not whole,' +
             ' or if n is divisible by 2 or 3.',
         '  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:',
         '    return False',
         '  # Check all the numbers of form 6k +/- 1, up to sqrt(n).',
         '  for x in range(6, int(math.sqrt(n)) + 2, 6):',
         '    if n % (x - 1) == 0 or n % (x + 1) == 0:',
         '      return False',
         '  return True']);
    code = functionName + '(' + number_to_check + ')';
    return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.VBA.valueToCode(block, 'DIVISOR',
          Blockly.VBA.ORDER_MULTIPLICATIVE);
      // If 'divisor' is some code that evals to 0, VBA will raise an error.
      if (!divisor || divisor == '0') {
        return ['False', Blockly.VBA.ORDER_ATOMIC];
      }
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.VBA.ORDER_RELATIONAL];
};

Blockly.VBA['math_change'] = function(block) {
  // Add to a variable in place.
  Blockly.VBA.definitions_['from_numbers_import_Number'] =
      'from numbers import Number';
  var argument0 = Blockly.VBA.valueToCode(block, 'DELTA',
      Blockly.VBA.ORDER_ADDITIVE) || '0';
  var varName = Blockly.VBA.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = (' + varName + ' if isinstance(' + varName +
      ', Number) else 0) + ' + argument0 + '\n';
};

// Rounding functions have a single operand.
Blockly.VBA['math_round'] = Blockly.VBA['math_single'];
// Trigonometry functions have a single operand.
Blockly.VBA['math_trig'] = Blockly.VBA['math_single'];

Blockly.VBA['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list = Blockly.VBA.valueToCode(block, 'LIST',
      Blockly.VBA.ORDER_NONE) || '[]';
  var code;
  switch (func) {
    case 'SUM':
      code = 'sum(' + list + ')';
      break;
    case 'MIN':
      code = 'min(' + list + ')';
      break;
    case 'MAX':
      code = 'max(' + list + ')';
      break;
    case 'AVERAGE':
      Blockly.VBA.definitions_['from_numbers_import_Number'] =
          'from numbers import Number';
      var functionName = Blockly.VBA.provideFunction_(
          'math_mean',
          // This operation excludes null and values that aren't int or float:',
          // math_mean([null, null, "aString", 1, 9]) == 5.0.',
          ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
           '  localList = [e for e in myList if isinstance(e, Number)]',
           '  if not localList: return',
           '  return float(sum(localList)) / len(localList)']);
      code = functionName + '(' + list + ')';
      break;
    case 'MEDIAN':
      Blockly.VBA.definitions_['from_numbers_import_Number'] =
          'from numbers import Number';
      var functionName = Blockly.VBA.provideFunction_(
          'math_median',
          // This operation excludes null values:
          // math_median([null, null, 1, 3]) == 2.0.
          ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
           '  localList = sorted([e for e in myList if isinstance(e, Number)])',
           '  if not localList: return',
           '  if len(localList) % 2 == 0:',
           '    return (localList[len(localList) // 2 - 1] + ' +
               'localList[len(localList) // 2]) / 2.0',
           '  else:',
           '    return localList[(len(localList) - 1) // 2]']);
      code = functionName + '(' + list + ')';
      break;
    case 'MODE':
      var functionName = Blockly.VBA.provideFunction_(
          'math_modes',
          // As a list of numbers can contain more than one mode,
          // the returned result is provided as an array.
          // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
          ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(some_list):',
           '  modes = []',
           '  # Using a lists of [item, count] to keep count rather than dict',
           '  # to avoid "unhashable" errors when the counted item is ' +
               'itself a list or dict.',
           '  counts = []',
           '  maxCount = 1',
           '  for item in some_list:',
           '    found = False',
           '    for count in counts:',
           '      if count[0] == item:',
           '        count[1] += 1',
           '        maxCount = max(maxCount, count[1])',
           '        found = True',
           '    if not found:',
           '      counts.append([item, 1])',
           '  for counted_item, item_count in counts:',
           '    if item_count == maxCount:',
           '      modes.append(counted_item)',
           '  return modes']);
      code = functionName + '(' + list + ')';
      break;
    case 'STD_DEV':
      Blockly.VBA.definitions_['import_math'] = 'import math';
      var functionName = Blockly.VBA.provideFunction_(
          'math_standard_deviation',
          ['def ' + Blockly.VBA.FUNCTION_NAME_PLACEHOLDER_ + '(numbers):',
           '  n = len(numbers)',
           '  if n == 0: return',
           '  mean = float(sum(numbers)) / n',
           '  variance = sum((x - mean) ** 2 for x in numbers) / n',
           '  return math.sqrt(variance)']);
      code = functionName + '(' + list + ')';
      break;
    case 'RANDOM':
      Blockly.VBA.definitions_['import_random'] = 'import random';
      code = 'random.choice(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.VBA.valueToCode(block, 'DIVIDEND',
      Blockly.VBA.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'DIVISOR',
      Blockly.VBA.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0.trim() + ' % ' + argument1.trim();
  return [code, Blockly.VBA.ORDER_MULTIPLICATIVE];
};

Blockly.VBA['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.VBA.valueToCode(block, 'VALUE',
      Blockly.VBA.ORDER_NONE) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'LOW',
      Blockly.VBA.ORDER_NONE) || '0';
  var argument2 = Blockly.VBA.valueToCode(block, 'HIGH',
      Blockly.VBA.ORDER_NONE) || 'float(\'inf\')';
  var code = 'min(max(' + argument0.trim() + ', ' + argument1.trim() + '), ' +
      argument2.trim() + ')';
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  Blockly.VBA.definitions_['import_random'] = 'import random';
  var argument0 = Blockly.VBA.valueToCode(block, 'FROM',
      Blockly.VBA.ORDER_NONE) || '0';
  var argument1 = Blockly.VBA.valueToCode(block, 'TO',
      Blockly.VBA.ORDER_NONE) || '0';
  var code = 'random.randint(' + argument0.trim() + ', ' + argument1.trim() + ')';
  return [code, Blockly.VBA.ORDER_FUNCTION_CALL];
};

Blockly.VBA['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  Blockly.VBA.definitions_['import_random'] = 'import random';
  return ['random.random()', Blockly.VBA.ORDER_FUNCTION_CALL];
};
