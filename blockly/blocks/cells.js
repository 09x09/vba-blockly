'use strict';

goog.provide('Blockly.Blocks.Cells');  // Deprecated
goog.provide('Blockly.Constants.Cells');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([

	{
	  "type": "get_cell",
	  "message0": "Get property %1 of cell at Row %2 , Column %3",
	  "args0": [
	    {
		  "type": "input_value",
		  "name": "PROP"
		},
		{
		  "type": "input_value",
		  "name": "ROW"
		},
		{
		  "type": "input_value",
		  "name": "COL"
		}
	  ],
	  "inputsInline": true,
	  "output": null,
	  "colour": 60,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "value",
	  "message0": "Value",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "formula",
	  "message0": "Formula",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "formulaR1C1",
	  "message0": "Formula(R1C1)",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "set_cell",
	  "message0": "Set property %1 of cell at Row %2 Column %3 to Value %4",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "PROP"
		},
		{
		  "type": "input_value",
		  "name": "ROW"
		},
		{
		  "type": "input_value",
		  "name": "COL"
		},
		{
		  "type": "input_value",
		  "name": "VAL"
		}
		],
	  "inputsInline": true,
	  "output": null,
	  "colour": 60,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "font",
	  "message0": "Font %1",
	  "args0": [
		{
		  "type": "field_dropdown",
		  "name": "OPT",
		  "options": [
			[
			  "Name",
			  "NAME"
			],
			[
			  "Size",
			  "SIZE"
			]
		  ]
		}
	  ],
	  "inputsInline": true,
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "colour",
	  "message0": "Color",
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
	{
	  "type": "fill",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_colour",
		  "name": "COL",
		  "colour": "#ff0000"
		}
	  ],
	  "output": null,
	  "colour": 0,
	  "tooltip": "",
	  "helpUrl": ""
	},
]);