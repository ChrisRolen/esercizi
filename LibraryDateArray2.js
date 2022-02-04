(function (w) {
    var configuration = {
        'en': {
            short_months: [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            long_months: [undefined, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            short_days: [undefined, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            long_days: [undefined, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    }
    var min = 0;
    var twelveformat = '';
    var hours = 0;

    function config(parameter, Value) {

        if (typeof parameter == 'string') {
            if (parameter == 'language') {

                if (!(Value == null) && Value && !(Object.keys(Value).length == 0) && (Object.getPrototypeOf(Value) === Object.prototype)) {
                    var lang = Object.keys(Value)[0];
                    var newconf = Value[lang];
                    var keys = Object.keys(newconf);
                } else {
                    throw TypeError('Variable Value is not of the required format or is an empty object.');
                }


                if (!keys.includes('short_months') || !keys.includes('long_months')
                    || !keys.includes('short_days') || !keys.includes('long_days') || !(newconf['long_days'].length === 7)
                    || !(newconf['short_days'].length === 7) || !(newconf['long_months'].length === 12) || !(newconf['short_months'].length === 12)) {
                    throw TypeError('Variable Value does not contain all the required values.');
                }


                newconf['long_days'].forEach(e => {
                    if (!(typeof e === 'string')) {
                        throw TypeError('Variable long_days does not contain all strings.');
                    }
                });
                newconf['long_days'].unshift(undefined);

                newconf['short_days'].forEach(e => {
                    if (!(typeof e === 'string')) {
                        throw TypeError('Variable short_days does not contain all strings.');
                    }
                });
                newconf['short_days'].unshift(undefined);

                newconf['short_months'].forEach(e => {
                    if (!(typeof e === 'string')) {
                        throw TypeError('Variable short_months does not contain all strings.');
                    }
                });
                newconf['short_months'].unshift(undefined);

                newconf['long_months'].forEach(e => {
                    if (!(typeof e === 'string')) {
                        throw TypeError('Variable long_months does not contain all strings.');
                    }
                });
                newconf['long_months'].unshift(undefined);

                configuration = {configuration, Value};

            }
        }
    }


    function format(date, format, options) {
        if (options == null) {
            options = 'en';
        }

        if (date instanceof Date && typeof format == "string") {
            var locale_date = new Date(date.toLocaleDateString(options));
            var res = date_substitution(format, locale_date, options);
            return res;

        } else {
            throw TypeError('Variable date or format are not of the required format.');
        }

    }

    function parse(date, date_format, options) {
        if (options == null) {
            options = 'en';
        }

        if (date instanceof Array && date_format instanceof Array) {
            var long_months = configuration[options].long_months;
            var short_months = configuration[options].short_months;
            var long_days = configuration[options].long_days;
            var short_days = configuration[options].short_days;
            var result = new Date();
            var form = date_format;
            var indx = 0;
            var form_position = 0;
            var array_result = [];
            form.forEach(element => {
                form_position = date_format.indexOf(element);
                while (element.includes('YYYY') || element.includes('YY') || element.includes('MMMM')
                || element.includes('MMM') || element.includes('MM') || element.includes('M')
                || element.includes('DDDD') || element.includes('DDD') || element.includes('DD')
                || element.includes('D') || element.includes('HH') || element.includes('H')
                || element.includes('hh') || element.includes('h') || element.includes('mm')
                || element.includes('m') || element.includes('ss') || element.includes('s')
                || element.includes('sss') || element.includes('X') || element.includes('x')
                || element.includes('T') || element.includes('Z')) {
                    if (element.match(/YYYY*MM*DDTHH*mm*ss/)) {

                        result = new Date(form);
                        element = '';

                    } else if (element.includes('YYYY')) {
                        indx = element.indexOf('YYYY');
                        result.setFullYear(parseInt(date[form_position].substr(indx, 4)));
                        element = element.replace('YYYY', 'NNNN');

                    } else if (element.includes('YY')) {

                        indx = element.indexOf('YY');
                        result.setFullYear(parseInt('20' + date[form_position].substr(indx, 2)));
                        element = element.replace('YY', 'NN');

                    } else if (element.includes('MMMM')) {

                        for (let i = 0; i < long_months.length; i++) {
                            if (date[form_position].includes(long_months[i])) {
                                result.setMonth(i);
                            }
                        }
                        element = element.replace('MMMM', 'NNNN');
                    } else if (element.includes('MMM')) {
                        for (let i = 0; i < short_months.length; i++) {
                            if (date[form_position].includes(short_months[i])) {
                                result.setMonth(i);
                            }
                        }

                        element = element.replace('MMM', 'NNN')

                    } else if (element.includes('MM')) {
                        indx = element.indexOf('MM');
                        result.setMonth(parseInt(date[form_position].substr(indx, 2)));
                        element = element.replace('MM', 'NN');

                    } else if (element.includes('M')) {
                        indx = element.indexOf('M');

                        if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                            result.setMonth(parseInt(date[form_position].substr(indx, 1)));
                            element = element.replace('M', 'N');
                        } else {
                            result.setMonth(parseInt(date[form_position].substr(indx, 2)));
                            element = element.replace('M', 'NN');
                        }

                    } else if (element.includes('DDDD')) {
                        for (let i = 0; i < long_days.length; i++) {
                            if (element.includes(long_days[i])) {
                                //
                            }
                        }
                    } else if (element.includes('DDD')) {
                        //
                    } else if (element.includes('DD')) {

                        indx = element.indexOf('DD');
                        result.setDate(parseInt(date[form_position].substr(indx, 2)));
                        element = element.replace('DD', 'NN');

                    } else if (element.includes('D')) {

                        indx = element.indexOf('D');
                        if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                            result.setDate(parseInt(date[form_position].substr(indx, 1)));
                            element = element.replace('D', 'N');
                        } else {
                            result.setDate(parseInt(date[form_position].substr(indx, 2)));
                            element = element.replace('D', 'NN');
                        }


                    } else if (element.includes('HH')) {

                        indx = element.indexOf('HH');
                        result.setHours(parseInt(date[form_position].substr(indx, 2)));
                        element = element.replace('HH', 'NN');

                    } else if (element.includes('H')) {

                        indx = element.indexOf('H');
                        if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                            result.setHours(parseInt(date[form_position].substr(indx, 1)));
                            element = element.replace('H', 'N');
                        } else {
                            result.setHours(parseInt(date[form_position].substr(indx, 2)));
                            element = element.replace('H', 'NN');
                        }
                    } else if (element.includes('hh')) {

                        indx = element.indexOf('hh');

                        if (date[form_position].substr(indx, 4).includes('pm')) {
                            hours = parseInt(date[form_position].substr(indx, 2)) + 12;
                            result.setHours(hours);
                        } else if (date[form_position].substr(indx, 4).includes('am')) {

                            result.setHours(parseInt(date[form_position].substr(indx, 2)));

                        }

                        element = element.replace('hh', 'NNNN');

                    } else if (element.includes('h')) {

                        indx = element.indexOf('h');

                        if (date[form_position].substr(indx, 4).includes('pm')) {
                            if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                                hours = parseInt(date[form_position].substr(indx, 1)) + 12;
                                result.setHours(hours);
                                element = element.replace('h', 'NNN');
                            } else {
                                hours = parseInt(date[form_position].substr(indx, 2)) + 12;
                                result.setHours(hours);
                                element = element.replace('h', 'NNNN');
                            }

                        } else if (date[form_position].substr(indx, 4).includes('am')) {

                            if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                                hours = parseInt(date[form_position].substr(indx, 1));
                                result.setHours(hours);
                                element = element.replace('h', 'NNN');
                            } else {
                                hours = parseInt(date[form_position].substr(indx, 2));
                                result.setHours(hours);
                                element = element.replace('h', 'NNNN');
                            }


                        }



                    } else if (element.includes('mm')) {
                        indx = element.indexOf('mm');
                        result.setMinutes(parseInt(date[form_position].substr(indx, 2)));
                        element = element.replace('mm', 'NN');

                    } else if (element.includes('m')) {
                        indx = element.indexOf('m');

                        if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                            result.setMinutes(parseInt(date[form_position].substr(indx, 1)));
                            element = element.replace('m', 'N');
                        } else {
                            result.setMinutes(parseInt(date[form_position].substr(indx, 2)));
                            element = element.replace('m', 'NN');
                        }


                    } else if (element.includes('s')) {
                        indx = element.indexOf('s');
                        if (element.substr(indx + 1, 1).includes('s')) {
                            if (element.substr(indx + 2, 1).includes('s')) {
                                result.setMilliseconds(parseInt(date[form_position].substr(indx, 3)));
                                element = element.replace('sss', 'NNN');
                            } else {
                                result.setSeconds(parseInt(date[form_position].substr(indx, 2)));
                                element = element.replace('ss', 'NN');
                            }
                        } else {
                            if (date[form_position].substr(indx + 1, 1).match(/[^0-9]/gm)) {
                                result.setSeconds(parseInt(date[form_position].substr(indx, 1)));
                                element = element.replace('s', 'N');
                            } else {
                                result.setSeconds(parseInt(date[form_position].substr(indx, 2)));
                                element = element.replace('s', 'NN');
                            }
                        }


                    } else if (element.includes('T')) {
                        element = element.replace('T', 'NNN');
                    }


                }
                array_result.push(result);
            })
            return array_result;

        } else {
            console.log(new TypeError('Variable date or format are not of the required format.').message);
        }

    }

    function date_substitution(sentence, date, options) {
        var replacement = sentence;
        var result = replacement;
        var long_months = configuration[options].long_months;
        var short_months = configuration[options].short_months;
        var long_days = configuration[options].long_days;
        var short_days = configuration[options].short_days;

        while (replacement.includes('YYYY') || replacement.includes('YY') || replacement.includes('MMMM')
        || replacement.includes('MMM') || replacement.includes('MM') || replacement.includes('M')
        || replacement.includes('DDDD') || replacement.includes('DDD') || replacement.includes('DD')
        || replacement.includes('D') || replacement.includes('HH') || replacement.includes('H')
        || replacement.includes('hh') || replacement.includes('h') || replacement.includes('mm')
        || replacement.includes('m') || replacement.includes('ss') || replacement.includes('s')
        || replacement.includes('sss') || replacement.includes('X') || replacement.includes('x')
        || replacement.includes('T') || replacement.includes('Z')) {

            if (replacement.includes('YYYY')) {

                result = result.replace('YYYY', date.getFullYear());
                replacement = replacement.replace('YYYY', '');

            } else if (replacement.includes('YY')) {

                shortyear = date.getFullYear().toString().substr(-2);
                result = result.replace('YY', shortyear);
                replacement = replacement.replace('YY', '');

            } else if (replacement.includes('MMMM')) {

                fullmonth = long_months[date.getMonth()];
                result = result.replace('MMMM', fullmonth);
                replacement = replacement.replace('MMMM', '');

            } else if (replacement.includes('MMM')) {

                shortmonth = short_months[date.getMonth()];
                replacement = replacement.replace('MMM', shortmonth);

            } else if (replacement.includes('MM')) {

                if (date.getMonth() < 10) {
                    result = result.replace('MM', '0' + date.getMonth());
                    replacement = replacement.replace('MM', '');
                } else {
                    result = result.replace('MM', date.getMonth());
                    replacement = replacement.replace('MM', date.getMonth());
                }

            } else if (replacement.includes('M')) {
                result = result.replace('M', date.getMonth());
                replacement = replacement.replace('M', 'N');

            } else if (replacement.includes('DDDD')) {

                longday = long_days[date.getDay()];
                result = result.replace('DDDD', longday);
                replacement = replacement.replace('DDDD', 'NNNN');

            } else if (replacement.includes('DDD')) {

                shortday = short_days[date.getDay()];
                result = result.replace('DDD', shortday);
                replacement = replacement.replace('DDD', 'NNN');

            } else if (replacement.includes('DD')) {

                if (date.getDate() < 10) {
                    result = result.replace('DD', '0' + date.getDate());
                    replacement = replacement.replace('DD', 'NN');
                } else {
                    result = result.replace('DD', date.getDate());
                    replacement = replacement.replace('DD', 'NN');
                }
            } else if (replacement.includes('D')) {
                result = result.replace('D', date.getDate());
                replacement = replacement.replace('D', 'N');

            } else if (replacement.includes('T')) {

                replacement = replacement.replace('T', ' ');
                result = result.replace('T', ' ');
            } else if (replacement.includes('HH')) {

                result = result.replace('HH', date.getHours());
                replacement = replacement.replace('HH', '');

            } else if (replacement.includes('H')) {

                if (date.getHours() < 10) {
                    replacement = replacement.replace('H', '0' + date.getHours());
                    result = result.replace('H', '0' + date.getHours());
                } else {
                    replacement = replacement.replace('H', '');
                    result = result.replace('H', date.getHours());
                }

            } else if (replacement.includes('hh')) {

                if (date.getHours() > 12)
                    if (date.getHours() % 12 < 10)
                        twelveformat = '0' + date.getHours() % 12 + 'pm';
                    else
                        twelveformat = date.getHours() % 12 + 'pm';
                else {

                    if (date.getHours() < 10)
                        twelveformat = '0' + date.getHours() + 'am';
                    else
                        twelveformat = date.getHours() + 'am';

                }

                result = result.replace('hh', twelveformat);
                replacement = replacement.replace('hh', '');

            } else if (replacement.includes('h')) {

                if (date.getHours() > 12)
                    twelveformat = date.getHours() % 12 + 'pm';
                else {
                    twelveformat = date.getHours() + 'am';

                }

                result = result.replace('hh', twelveformat);
                replacement = replacement.replace('hh', '');

            } else if (replacement.includes('mm')) {

                if (date.getMinutes() < 10) {
                    min = '0' + date.getMinutes();
                    result = result.replace('mm', min);
                    replacement = replacement.replace('mm', '')
                } else
                    result = result.replace('mm', date.getMinutes());
                replacement = replacement.replace('mm', '');

            } else if (replacement.includes('m')) {

                result = result.replace('m', date.getMinutes());
                replacement = replacement.replace('m', '');

            } else if (replacement.includes('ss')) {

                if (date.getSeconds() < 10) {
                    min = '0' + date.getSeconds();
                    replacement = replacement.replace('ss', '');
                    result = result.replace('ss', min);
                } else {
                    replacement = replacement.replace('ss', '');
                    result = result.replace('ss', date.getSeconds());
                }



            } else if (replacement.includes('s')) {
                result = result.replace('s', date.getSeconds());
                replacement = replacement.replace('s', '');
            } else if (replacement.includes('sss')) {
                result = result.replace('sss', date.getMilliseconds());
                replacement = replacement.replace('sss', '');
            } else if (replacement.includes('X')) {
                result = result.replace('X', '1410715640.579');
                replacement = replacement.replace('X', '');
            } else if (replacement.includes('x')) {
                result = result.replace('x', '1410715640579');
                replacement = replacement.replace('x', '');
            } else if (replacement.includes('Z')) {
                result = result.replace('Z', "+/-");
                replacement = replacement.replace('Z', '');
            }

        }
        return result;
    }

    w.DateFormatter = {

        format: format,

        parse: parse,

        config: config

    }

})(global);

