'use strict';

goog.provide('Blockly.VBA.Worksheet');

goog.require('Blockly.VBA');

Blockly.VBA['ws'] = function(block) {
  var value_name = Blockly.VBA.valueToCode(block, 'NAME', Blockly.VBA.ORDER_ATOMIC);
  var text_sheetname = block.getFieldValue('SHEETNAME');
  var code = 'Worksheets(\"' + text_sheetname + '\")' + value_name;
  return code;
};

Blockly.VBA['activate'] = function(block) {
  var code = '.Activate\n';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['printout'] = function(block) {
  var code = '.PrintOut';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['print_copies'] = function(block) {
  var value_copy = Blockly.VBA.valueToCode(block, 'COPY', Blockly.VBA.ORDER_ATOMIC);
  var value_start_page = Blockly.VBA.valueToCode(block, 'START_PAGE', Blockly.VBA.ORDER_ATOMIC);
  var value_end_page = Blockly.VBA.valueToCode(block, 'END_PAGE', Blockly.VBA.ORDER_ATOMIC);
  var code = '.PrintOut From:=' +  value_start_page + ' ,To:=' + value_end_page + ' ,Copies:=' + value_copy + '\n';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['active_sheet'] = function(block) {
  var value_prop = Blockly.VBA.valueToCode(block, 'PROP', Blockly.VBA.ORDER_ATOMIC);
    var code = 'ActiveSheet.' + value_name;
  return code;
};

Blockly.VBA['range_get'] = function(block) {
  var value_name = Blockly.VBA.valueToCode(block, 'NAME', Blockly.VBA.ORDER_ATOMIC);
  var text_range = block.getFieldValue('RANGE');
  // TODO: Assemble VBA into code variable.
  var code = 'Range(\"' + text_range + '\")' + value_name ;
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['range_set'] = function(block) {
  var value_name = Blockly.VBA.valueToCode(block, 'NAME', Blockly.VBA.ORDER_ATOMIC);
  var text_range = block.getFieldValue('RANGE');
  var value_value = Blockly.VBA.valueToCode(block, 'VALUE', Blockly.VBA.ORDER_ATOMIC);
  var code = 'Range(\"' + text_range + '\")' + value_name + ' = ' + value_value;
  return [code, Blockly.VBA.ORDER_ATOMIC];
};