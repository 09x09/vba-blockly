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
 * @fileoverview Helper functions for generating VBA for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.VBA');

goog.require('Blockly.Generator');


/**
 * VBA code generator.
 * @type {!Blockly.Generator}
 */
Blockly.VBA = new Blockly.Generator('VBA');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.VBA.addReservedWords(
	'AddHandler,AddressOf,Alias,And,AndAlso,As,Base,Boolean,ByRef,Byte,ByVal,Call,' +
	'Case,Catch,CBool,CByte,CChar,CDate,CDec,CDbl,Char,CInt,Class,CLng,CObj,Const,' +
	'Continue,CSByte,CShort,CSng,CStr,CType,CUInt,CULng,CUShort,Date,Decimal,Declare,Default,' +
	'Delegate,Dim,DirectCast,Do,Double,Each,Else,ElseIf,End,EndIf,Enum,Erase,Error,' +
	'Event,Exit,False,Finally,For,Friend,Function,Get,GetType,GetXMLNamespace,Global,' +
	'GoSub,GoTo,Handles,If,Implements,Imports,In,Inherits,Integer,Interface,Is,IsNot,' +
	'Let,Lib,Like,Long,Loop,Me,Mod,Module,MustInherit,MustOverride,MyBase,MyClass,Namespace,' +
	'Narrowing,New,Next,Not,Nothing,NotInheritable,NotOverridable,Object,Of,On,Operator,' +
	'Option,Optional,Or,OrElse,Overloads,Overridable,Overrides,ParamArray.Partial,' +
	'Private,Property,Protected,Public,RaiseEvent,ReadOnly,ReDim,REM,RemoveHandler,Resume,' +
	'Return,SByte,Select,Set,Shadows,Shared,Short,Single,Static,Step,Stop,String,Structure,Sub,' +
	'SyncLock,Then,Throw,To,True,Try,TryCast,TypeOf,Variant,Wend,UInteger,ULong,UShort,Using,' +
	'When,While,Widening,With,WithEvents,WriteOnly,Xor,'
);

/**
 * Order of operation ENUMs.
 * http://docs.VBA.org/reference/express ions.html#summary
 */
Blockly.VBA.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.VBA.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.VBA.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.VBA.ORDER_MEMBER = 2.1;          // . []
Blockly.VBA.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.VBA.ORDER_EXPONENTIATION = 3;    // **
Blockly.VBA.ORDER_UNARY_SIGN = 4;        // + -
Blockly.VBA.ORDER_BITWISE_NOT = 4;       // ~
Blockly.VBA.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.VBA.ORDER_ADDITIVE = 6;          // + -
Blockly.VBA.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.VBA.ORDER_BITWISE_AND = 8;       // &
Blockly.VBA.ORDER_BITWISE_XOR = 9;       // ^
Blockly.VBA.ORDER_BITWISE_OR = 10;       // |
Blockly.VBA.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.VBA.ORDER_LOGICAL_NOT = 12;      // not
Blockly.VBA.ORDER_LOGICAL_AND = 13;      // and
Blockly.VBA.ORDER_LOGICAL_OR = 14;       // or
Blockly.VBA.ORDER_CONDITIONAL = 15;      // if else
Blockly.VBA.ORDER_LAMBDA = 16;           // lambda
Blockly.VBA.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.VBA.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.VBA.ORDER_FUNCTION_CALL, Blockly.VBA.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.VBA.ORDER_FUNCTION_CALL, Blockly.VBA.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.VBA.ORDER_MEMBER, Blockly.VBA.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.VBA.ORDER_MEMBER, Blockly.VBA.ORDER_FUNCTION_CALL],

  // not (not foo) -> not not foo
  [Blockly.VBA.ORDER_LOGICAL_NOT, Blockly.VBA.ORDER_LOGICAL_NOT],
  // a and (b and c) -> a and b and c
  [Blockly.VBA.ORDER_LOGICAL_AND, Blockly.VBA.ORDER_LOGICAL_AND],
  // a or (b or c) -> a or b or c
  [Blockly.VBA.ORDER_LOGICAL_OR, Blockly.VBA.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.VBA.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in VBA.
   */
  Blockly.VBA.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.VBA.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.VBA.functionNames_ = Object.create(null);

  if (!Blockly.VBA.variableDB_) {
    Blockly.VBA.variableDB_ =
        new Blockly.Names(Blockly.VBA.RESERVED_WORDS_);
  } else {
    Blockly.VBA.variableDB_.reset();
  }

  Blockly.VBA.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.VBA.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push('Dim ' + Blockly.VBA.variableDB_.getName(variables[i].getId(),
      Blockly.Variables.NAME_TYPE) + ' As Variant');
  }

  Blockly.VBA.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.VBA.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.VBA.definitions_) {
    var def = Blockly.VBA.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  // Clean up temporary data.
  delete Blockly.VBA.definitions_;
  delete Blockly.VBA.functionNames_;
  Blockly.VBA.variableDB_.reset();
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.VBA.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped VBA string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} VBA string.
 * @private
 */
Blockly.VBA.quote_ = function(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\%/g, '\\%');

  // Follow the CVBA behaviour of repr() for a non-byte string.
  var quote = '\'';
  if (string.indexOf('\'') !== -1) {
    if (string.indexOf('"') === -1) {
      quote = '"';
    } else {
      string = string.replace(/'/g, '\\\'');
    }
  };
  return quote + string + quote;
};

/**
 * Common tasks for generating VBA from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The VBA code created for this block.
 * @return {string} VBA code with comments and subsequent blocks added.
 * @private
 */
Blockly.VBA.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.VBA.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '"""' + comment + '\n"""\n';
      } else {
        commentCode += Blockly.VBA.prefixLines(comment + '\n', '# ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.VBA.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.VBA.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.VBA.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.VBA.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.VBA.ORDER_ADDITIVE :
      Blockly.VBA.ORDER_NONE;
  var at = Blockly.VBA.valueToCode(block, atId, atOrder) || defaultAtIndex;

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
    }
  }
  return at;
};
