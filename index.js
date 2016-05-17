/**
 * d20.js
 *
 * Javascript library for rolling dice. Supports strings written in a dice-rolling syntax, eg. "d20", "4d6", "1d8+1".
 *
 * @author Michael Enger <mike@thelonelycoder.com>
 * @licence MIT
 */

'use strict';
function d20roll(dice) {
		var result = verboseRoll(dice),
			num = 0;

            for (var i in result) {
                num += result[i];
            }

            return num;
}

	function verboseRoll(dice) {
		var amount = 1,
			mod = 0,
			results = [],
			match,
			num,
			modifiers;

		if (!dice) {
			throw new Error('Missing dice parameter.');
		}

		if (typeof dice == 'string') {
			match = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
			if (match) {
				if (match[1]) {
					amount = parseInt(match[1]);
				}
				if (match[2]) {
					dice = parseInt(match[2]);
				}
				if (match[3]) {
					modifiers = match[3].match(/([+-]\s*\d+)/g);
					for (var i = 0; i < modifiers.length; i++) {
						mod += parseInt(modifiers[i].replace(/\s/g, ''));
					}
				}
			} else {
				parseInt(dice);
			}
		}

		for (var i = 0; i < amount; i++) {
			num = Math.floor(Math.random() * dice + 1);
			results.push(num);
		}

		results = results.sort(function(a, b) {
			return a - b;
		});
		if (mod != 0) {
			results.push(mod);
		}

		return results;
	}

module.exports = (pluginContext) => {
    const logger = pluginContext.logger;
   
    var count = 1; 
    var currentRes = null;

    function search(query, res) {
        res.add({
            id: "exec",
            title: "Roll the dice: "+query+" <span style='width:100px;height:100px;'</span>",
            desc: "<span style='width:100px;height:100px;'</span>",
            payload: query
        });
        currentRes = res;
    }
    function execute(id, payload) {
        if (id=="exec") {
            logger.log("executing roll!");
            try {
                var result = d20roll(payload);
            } catch (err) {
                var result = '';
            }
            currentRes.add({
                id: "roll_" + count,
                title: result+" <span style='width:100px;height:100px;'</span>",
                desc: "<span style='width:100px;height:100px;'</span>",
            });
            count++;
        }
    }
return { search, execute };
};
