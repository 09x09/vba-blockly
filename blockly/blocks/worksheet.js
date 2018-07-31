'use strict';

goog.provide('Blockly.Blocks.Worksheet');  // Deprecated
goog.provide('Blockly.Constants.Worksheet');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
	{
	  "type": "ws",
	  "message0": "Get property or method %1 of  %2",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "NAME"
		},
		{
		  "type": "field_input",
		  "name": "SHEETNAME",
		  "text": "Sheet1"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 60,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "activate",
	  "message0": "Activate",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "printout",
	  "message0": "Print",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "print_copies",
	  "message0": "Print %1 copies, from page %2 to %3",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "COPY"
		},
		{
		  "type": "input_value",
		  "name": "START_PAGE"
		},
		{
		  "type": "input_value",
		  "name": "END_PAGE"
		}
	  ],
	  "inputsInline": true,
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},	
]);