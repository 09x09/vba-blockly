/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2018 Google Inc.
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
 * @fileoverview Generating VBA for dynamic variable blocks.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.VBA.variablesDynamic');

goog.require('Blockly.VBA');
goog.require('Blockly.VBA.variables');


// VBA is dynamically typed.
Blockly.VBA['variables_get_dynamic'] = Blockly.VBA['variables_get'];
Blockly.VBA['variables_set_dynamic'] = Blockly.VBA['variables_set'];
