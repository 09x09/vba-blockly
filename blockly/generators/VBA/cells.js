'use strict';

goog.provide('Blockly.VBA.Cells');

goog.require('Blockly.VBA');

Blockly.VBA['get_cell'] = function(block) {
  var value_prop = Blockly.VBA.valueToCode(block, 'PROP', Blockly.VBA.ORDER_ATOMIC);
  var value_row = Blockly.VBA.valueToCode(block, 'ROW', Blockly.VBA.ORDER_ATOMIC);
  var value_col = Blockly.VBA.valueToCode(block, 'COL', Blockly.VBA.ORDER_ATOMIC);
  var code = '.Cells(' + value_row + ', ' + value_col + ')' + value_prop + '\n';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['set_cell'] = function(block) {
  var value_prop = Blockly.VBA.valueToCode(block, 'PROP', Blockly.VBA.ORDER_ATOMIC);
  var value_row = Blockly.VBA.valueToCode(block, 'ROW', Blockly.VBA.ORDER_ATOMIC);
  var value_col = Blockly.VBA.valueToCode(block, 'COL', Blockly.VBA.ORDER_ATOMIC);
  var value_val = Blockly.VBA.valueToCode(block, 'VAL', Blockly.VBA.ORDER_ATOMIC);
  var code = '.Cells(' + value_row + ', ' + value_col + ')' + value_prop + ' = ' + value_val + '\n';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['value'] = function(block) {
  var code = '.Value';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['formula'] = function(block) {
  var code = '.Formula';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['formulaR1C1'] = function(block) {
  var code = '.FormulaR1C1';
  return [code, Blockly.VBA.ORDER_ATOMIC];
};

Blockly.VBA['font'] = function(block) {
  var dropdown_opt = block.getFieldValue('OPT');
  if (dropdown_opt == 'NAME') {
	  dropdown_opt = 'Name';
  } else {
	  dropdown_opt = 'Size';
  };
  var code = '.Font.' + dropdown_opt;
  return [code, Blockly.VBA.ORDER_ATOMIC];
};