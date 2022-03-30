var expect = require("chai").expect;
var window = {};
require("../LibraryDateArray2");
var lib = DateFormatter;
const {qunit} = require("mocha/lib/interfaces");
const assert = require('chai').assert;

var outputs = {
    full_year: ['2021', '1000', '1909', '2021', '2021', '2021', '999'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    numeric_months: ['11', '03', '01', '05'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    hours: ['00', '23'],
    minutes: ['00', '12', '59', '44', '22', '1'],
    seconds: ['00', '59', '01', '0'],
    m_seconds: ['0', '60']
}

var dates = [
    new Date(2021, 11, 4,),
    new Date(999, 15, 4),
    new Date(9, 11, 4),
    new Date(2021, 1, 4),
    new Date(2021, 11, 9, 23, 59, 59),
    new Date(2021, 11, 4, 23, 12, 1, 60),
    new Date(999, 5, 12)
]

var form_puts = {
    full_year: ['21', '11', '1'],
    months: [5, 4, 2],
    days: [28, 22, 6],
    hours: [1, 23, 0, 13]
}


describe('Date', function () {
    describe('#format', function () {
        it('returns a String given a Date of the desired Format', function () {

            dates.forEach(d =>
                assert.isString(lib.format(d, 'Era il YY, di MM'))
            )
        });

        it('returns undefined if nothing is valid', function () {

            assert.throws(() => lib.format('no', 'no'), 'Variable date or format are not of the required format.');
        });

        it('returns a full year (maximum 4 chars) if YYYY is requested', function () {

            var i = 0
            dates.forEach(d => {
                assert.equal(lib.format(d, 'YYYY'), outputs.full_year[i]);
                i++;
            })
        });

        it('returns a short year (2 chars) if YY is requested', function () {

            var i = 0
            dates.forEach(d => {
                assert.equal(lib.format(d, 'YY'), outputs.full_year[i].slice(-2));
                i++;
            })
        });

        it('returns a full month written in letters if MMMM is requested', function () {

            dates.forEach(d => {
                var m = lib.format(d, 'MMMM');
                assert.oneOf(m, outputs.months);
            })

        });

        it('returns a short month written in letters if MMM is requested', function () {

            var halfmonth = [];
            outputs.months.forEach(d => halfmonth.push(d.toString().slice(0, 3)));
            dates.forEach(d => {
                var m = lib.format(d, 'MMM');
                assert.oneOf(m, halfmonth);
            })
        });

        it('returns a month in two digits if MM is requested', function () {

            dates.forEach(d => {
                var m = lib.format(d, 'MM');
                assert.oneOf(m, outputs.numeric_months);
            })

        });
        it('returns a month if M is requested', function () {

            dates.forEach(d => {
                var m = lib.format(d, 'M');
                if (parseInt(m) < 10)
                    m = '0' + m;
                assert.oneOf(m, outputs.numeric_months);
            })
        });

        it('returns a full day of the week in letters if DDDD is requested', function () {


            dates.forEach(d => {
                var dddd = lib.format(d, 'DDDD');
                assert.oneOf(dddd, outputs.days);
            })

        });

        it('returns a short day of the week in letters if DDD is requested', function () {

            var halfdays = [];
            outputs.days.forEach(d => halfdays.push(d.toString().slice(0, 3)));
            dates.forEach(d => {
                var dddd = lib.format(d, 'DDD');
                assert.oneOf(dddd, halfdays);
            })

        });
        it('returns a two digit day if DD is requested', function () {

            dates.forEach(d => {
                assert.equal(lib.format(d, 'DD').length, 2);
            })

        });
        it('returns a one digit day if D is requested', function () {

            dates.forEach(d => {
                assert.isBelow(parseInt(lib.format(d, 'D')), 31);
            })

        });
        it('returns a blank space if T is requested ', function () {

            dates.forEach(d =>{
                assert.equal(lib.format(d, 'T'), " ");
            })

        });
        it('returns the hours in 0-24 format if HH is requested', function () {

            dates.forEach(d => {
                assert.isBelow(parseInt(lib.format(d, 'HH')), 25);
            })

        });
        it('returns the hours in two digits and 0-24 format if H is requested', function () {

            dates.forEach(d => {
                assert.isBelow(parseInt(lib.format(d, 'H')), 25);
                assert.oneOf(lib.format(d, 'H'), outputs.hours);
            })

        });
        it('returns the hours in two digits and 0-12 am/pm if hh is requested', function () {

            var form = [];
            outputs.hours.forEach(hh => {
                if (hh > 12){
                    form.push(hh%12 + 'pm')
                }else{
                    form.push('0' + hh%12 + 'am')
                }

            })

            dates.forEach(d => {
                assert.isBelow(parseInt(lib.format(d, 'hh')), 13);
                assert.oneOf(lib.format(d, 'hh'), form);
            })
            
        });

        it('returns the hours in 0-12 am/pm format if h is requested', function () {

            var form = [];
            outputs.hours.forEach(hh => {
                if (hh > 12){
                    form.push(hh%12 + 'pm')
                }else{
                    form.push(hh%12 + 'am')
                }

            })

            dates.forEach(d => {
                assert.oneOf(lib.format(d, 'h'), form);
            })

        });
        it('return two digits minutes if mm is requested', function () {
            dates.forEach(d => {
                assert.oneOf(lib.format(d, 'mm'), outputs.minutes);

            })

        });
        it('returns the minutes if m is requested', function () {

            var form = [];
            outputs.minutes.forEach(mm => {
                if (parseInt(mm) < 10){
                    form.push(mm.slice(-1))
                }else{
                    form.push(mm)
                }});

            dates.forEach(d => {
                assert.oneOf(lib.format(d, 'm'), form);
            })

        });
        it('returns two digits seconds if ss is requested', function () {

            dates.forEach(d => {
                assert.oneOf(lib.format(d, 'ss'), outputs.seconds)
            })

        });
        it('returns the seconds if s is requested', function () {

            var form = [];
            outputs.seconds.forEach(mm => {
                if (parseInt(mm) < 10){
                    form.push(mm.slice(-1))
                }else{
                    form.push(mm)
                }});

            dates.forEach(d => {
                assert.oneOf(lib.format(d, 's'), form);
            })

        });
        it('returns the milliseconds if sss is requested', function () {
            dates.forEach(d =>{
                assert.oneOf(lib.format(d, 'sss'), outputs.m_seconds);
            })
        });

    });
    describe('#parse', function () {
        it('returns an Array of Dates given an Array of Strings and the Format in which it is written', function () {
            assert.isArray(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD']))
        });

        it('sets an Array of Dates with a four digit year when YYYY is given', function () {
            var dates_yyy = ["21/8/28", "11/4/22", "1/2/6"];
            var form = ['YYYY/M/DD', 'YYYY/M/DD', 'YYYY/M/DD'];
            lib.parse(dates_yyy, form).forEach( d => {
               assert.oneOf(d.getFullYear().toString(), form_puts.full_year)
            });
        });

        it('sets an Array of Dates with an year with the "20" prefix when YY is given', function () {
            var dates_yy = ["21/8/28", "11/4/22", "1/2/6"];
            var form = ['YY/M/DD', 'YY/M/DD', 'YY/M/DD'];
            var output = [];
            form_puts.full_year.forEach(y => output.push('20'+ y));
            lib.parse(dates_yy, form).forEach( d => {
                assert.oneOf(d.getFullYear().toString(), output);
                assert.isBelow(d.getFullYear(), 2100);
            })
        });

        it('sets an Array of Dates with a month from their long names when MMMM is given', function () {
            var dates_mmmm = ["21/May/28", "11/April/22", "1/February/6" ];
            var form = ['YY/MMMM/DD', 'YY/MMMM/DD', 'YY/MMMM/DD'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getMonth(), form_puts.months);
            })
        });

        it('sets an Array of Dates with a month from their short names when MMM is given', function () {
            var dates_mmmm = ["21/May/28", "11/Apr/22", "1/Feb/6" ];
            var form = ['YY/MMM/DD', 'YY/MMM/DD', 'YY/MMM/DD'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getMonth(), form_puts.months);
            })
        });

        it('sets an Array of Dates with a month from two digits when MM is given', function () {
            var dates_mmmm = ["21/05/28", "11/04/22", "1/02/6" ];
            var form = ['YY/MM/DD', 'YY/MMMM/DD', 'YY/MM/DD'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getMonth(), form_puts.months);
            })
        });

        it('sets an Array of Dates with a month when M is given', function () {
            var dates_mmmm = ["21/5/28", "11/4/22", "1/2/6" ];
            var form = ['YY/M/DD', 'YY/M/DD', 'YY/M/DD'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getMonth(), form_puts.months);
            })
        });

        it('skips the command if DDDD is passed', function () {
            assert.isDefined(lib.parse(["Friday"], ['DDDD']))
        });

        it('skips the command if DDD is passed', function () {
            assert.isDefined(lib.parse(["Fri"], ['DDD']))
        });

        it('sets an Array of Dates with a day from two digits when DD is given', function () {
            var dates_mmmm = ["21/5/28", "11/4/22", "1/2/06" ];
            var form = ['YY/M/DD', 'YY/M/DD', 'YY/M/DD'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getDate(), form_puts.days);
            })
        });

        it('sets an Array of Dates with a day when D is given', function () {
            var dates_mmmm = ["21/5/28", "11/4/22", "1/2/6" ];
            var form = ['YY/M/D', 'YY/M/D', 'YY/M/D'];
            lib.parse(dates_mmmm, form).forEach( d => {
                assert.oneOf(d.getDate(), form_puts.days);
            })
        });

        it('sets an Array of Dates with the hours from two digits when HH is given', function () {
            var dates_hh = ["21/8/28 01:44", "21/8/28 23:44", "21/8/28 00:44"]
            var form = ['YY/M/DDTHH:mm', 'YY/M/DDTHH:mm', 'YY/M/DDTHH:mm']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getHours(), form_puts.hours);
            })
        });

        it('sets an Array of Dates with the hours when H is given', function () {
            var dates_hh = ["21/8/28 1:44", "21/8/28 23:44", "21/8/28 0:44"]
            var form = ['YY/M/DDTH:mm', 'YY/M/DDTHH:mm', 'YY/M/DDTH:mm']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getHours(), form_puts.hours);
            })
        });

        it('sets an Array of Dates with the hours from a 12 hours format in two digits when hh is given', function () {
            var dates_hh = ["21/8/28 01pm:44", "21/8/28 11pm:44", "21/8/28 12am:44"]
            var form = ['YY/M/DDThh:mm', 'YY/M/DDThh:mm', 'YY/M/DDThh:mm']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getHours(), form_puts.hours);
            })
        });

        it('sets an Array of Dates with the hours from a 12 hours format when h is given', function () {
            var dates_hh = ["21/8/28 1pm:44", "21/8/28 11pm:44", "21/8/28 12am:44"]
            var form = ['YY/M/DDThh:mm', 'YY/M/DDThh:mm', 'YY/M/DDThh:mm']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getHours(), form_puts.hours);
            })
        });

        it('sets an Array of Dates with the minutes from two digits when mm is given', function () {
            var dates_hh = ["21/8/28 01pm:01", "21/8/28 11pm:22", "21/8/28 12am:12"]
            var form = ['YY/M/DDThh:mm', 'YY/M/DDThh:mm', 'YY/M/DDThh:mm']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getMinutes().toString(), outputs.minutes);
            })
        });

        it('sets an Array of Dates with the minutes when m is given', function () {
            var dates_hh = ["21/8/28 01pm:1", "21/8/28 11pm:22", "21/8/28 12am:12"]
            var form = ['YY/M/DDThh:m', 'YY/M/DDThh:m', 'YY/M/DDThh:m']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getMinutes().toString(), outputs.minutes);
            })
        });

        it('sets an Array of Dates with the seconds from two digits when ss is given', function () {
            var dates_hh = ["21/8/28 01pm:1:00", "21/8/28 11pm:22:59", "21/8/28 12am:12:01"]
            var form = ['YY/M/DDThh:m:ss', 'YY/M/DDThh:m:ss', 'YY/M/DDThh:m:ss']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getSeconds().toString(), outputs.seconds);
            })
        });

        it('sets an Array of Dates with the seconds when s is given', function () {
            var dates_hh = ["21/8/28 01pm:1:0", "21/8/28 11pm:22:59", "21/8/28 12am:12:1"]
            var form = ['YY/M/DDThh:m:s', 'YY/M/DDThh:m:s', 'YY/M/DDThh:m:s']
            lib.parse(dates_hh, form).forEach( d => {
                assert.oneOf(d.getSeconds().toString(), outputs.seconds);
            })
        });

        it('sets an Array of Dates with the milliseconds when sss is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:12:394"], ['YY/M/DDThh:m:s:sss'])[0].getMinutes(), 1000)
        });

    });

    describe('#config', function () {
        it('sets an Object with a Label for the language given', function () {
            assert.isUndefined(lib.config('language', {
                'it': {
                    short_months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
                    long_months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                    short_days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
                    long_days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
                }
            }));
        });
        it('should get an error if an incomplete array of object is given', function () {
            assert.throws(() => lib.config('language', {'it': {}}), 'Variable Value does not contain all the required values.');
        });

    });
});