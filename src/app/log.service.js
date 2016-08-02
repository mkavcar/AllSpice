angular
    .module('allSpiceApp')
    .config(logConfig);

logConfig.$inject = ['$provide'];

function logConfig($provide) {
    $provide.decorator('$log', extendLogHandler);
}

extendLogHandler.$inject = ['$delegate', 'logApi'];

function extendLogHandler($delegate, logApi) {
    var logHandler = {
            info: info,
            warn: warn,
            error: error,
            debug: debug
        };

    return logHandler;

    ////////////
	function info(msg) {
        $delegate.info(msg);
        logApi.saveLog('info', msg);
    }
 	
    function warn(msg) {
        $delegate.warn(msg);
        logApi.saveLog('warning', msg);
    }

    function error(msg) {
        $delegate.error(msg);
        logApi.saveLog('error', msg);
    }

    function debug(msg) {
        $delegate.debug(msg);
        logApi.saveLog('debug', msg);
    }
}


angular
  .module('allSpiceApp')
  .factory('logApi', logApi);

function logApi() {
    var logs = [],
        logApi = {
            saveLog: saveLog,
            shipLogs: shipLogs
        };

    return logApi;
    
    ////////////
    function saveLog(level, msg) {
        logs.push({ 
            level: level, 
            message: msg
        });
    }

    function shipLogs(http) {
        if (logs.length > 0) {
            http.post('/logs', logs)
                .success(function () {
                    logs = [];
                });
            //return logs;
        }
    }
};



