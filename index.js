'use strict';

module.exports = (pluginContext) => {
    const logger = pluginContext.logger;
   
    var count = 1; 
    var currentRes = null;
    var d20 =require('d20');

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
                var result = d20.roll(payload);
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
