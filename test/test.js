var expect = require("chai").expect;
var window = {};
require("../LibraryDateArray2");
var lib = DateFormatter;
const {qunit} = require("mocha/lib/interfaces");
const assert = require('chai').assert;

describe('Date', function () {
    describe('#format', function () {
        it('returns a String given a Date of the desired Format', function () {

            assert.isString(lib.format(new Date(2021, 11, 4,), 'Era il YY, di MM'))

        });

        it('returns undefined if nothing is valid', function () {

            assert.throws(() => lib.format('no', 'no'), 'Variable date or format are not of the required format.');
        });

        it('returns a full year (4 chars) if YYYY is requested', function () {

            assert.isAtLeast(lib.format(new Date(2021, 11, 4), 'YYYY').length, 4)
        });

        it('returns a short year (2 chars) if YY is requested', function () {

            assert.isAtLeast(lib.format(new Date(2021, 11, 4), 'YY').length, 2)
        })

        it('returns a full month written in letters if MMMM is requested', function () {
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            m = lib.format(new Date(2021, 11, 4), 'MMMM')
            assert.oneOf(m, months)
        });

        it('returns a short month written in letters if MMM is requested', function () {


        });

        it('returns a month in two digits if MM is requested', function () {

            assert.isAtLeast(lib.format(new Date(2021, 11, 4), 'MM').length, 2)
        });
        it('returns a month if M is requested', function () {

            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4), 'M')), 13)
        });

        it('returns a full day of the week in letters if DDDD is requested', function () {
            var long_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            dddd = lib.format(new Date(2021, 11, 4), 'DDDD')
            assert.oneOf(dddd, long_days)
        });

        it('returns a short day of the week in letters if DDD is requested', function () {
            var short_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            ddd = lib.format(new Date(2021, 11, 4), 'DDD')
            assert.oneOf(ddd, short_days)
        });
        it('returns a two digit day if DD is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4), 'DD').length, 2)
        });
        it('returns a one digit day if D is requested', function () {
            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4), 'D')), 31)
        });
        it('returns a blank space if T is requested ', function () {
            assert.equal(lib.format(new Date(2021, 11, 4), 'T'), " ")
        });
        it('returns the hours in 0-24 format if HH is requested', function () {
            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'HH')), 25)
        });
        it('returns the hours in two digits and 0-24 format if H is requested', function () {
            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'H')), 25)
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'H').length, 2)
        });
        it('returns the hours in two digits and 0-12 am/pm if hh is requested', function () {
            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'hh')), 13)
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'hh').length, 4)
        });
        it('returns the hours in 0-12 a/pm format if h is requested', function () {
            assert.isBelow(parseInt(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'hh')), 13)
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'hh').length, 3)
        });
        it('return two digits minutes if mm is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'mm').length, 2)
        });
        it('returns the minutes if m is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'm').length, 1)
        });
        it('returns two digits seconds if ss is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'ss').length, 2)
        });
        it('returns the seconds if s is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 's').length, 1)
        });
        it('returns the milliseconds if sss is requested', function () {
            assert.isAtLeast(lib.format(new Date(2021, 11, 4, 23, 12, 41, 60), 'sss').length, 1)
        });
        it('returns', function () {

        });

    });
    describe('#parse', function () {
        it('returns an Array of Dates given an Array of Strings and the Format in which it is written', function () {
            lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD'])
        });

        it('sets an Array of Dates with a four digit year when YYYY is given', function () {
            res = lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD'])
            assert.isAtLeast(res[0].getFullYear().toString().length, 4)
        });

        it('sets an Array of Dates with an year with the "20" prefix when YY is given', function () {
            assert.isAtLeast(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD'])[0].getFullYear().toString().length, 4)
            assert.isBelow(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', "YY/M/DD"])[0].getFullYear(), 2100)
        });

        it('sets an Array of Dates with a month from their long names when MMMM is given', function () {
            assert.isBelow(lib.parse(["21/May/28", "21/May/28"], ['YY/MMMM/DD', 'YY/MMMM/DD'])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month from their short names when MMM is given', function () {
            assert.isBelow(lib.parse(["21/Feb/28", "21/Feb/28"], ['YY/MMM/DD', "YY/MMM/DD"])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month from two digits when MM is given', function () {
            assert.isBelow(lib.parse(["21/01/28"], ['YY/MM/DD'])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month when M is given', function () {
            assert.isBelow(lib.parse(["21/11/28"], ['YY/M/DD'])[0].getMonth(), 13)
        });

        it('skips the command if DDDD is passed', function (){
            lib.parse(["Friday"], ['DDDD'])
        });

        it('skips the command if DDD is passed', function (){
            lib.parse(["Fri"], ['DDD'])
        });

        it('sets an Array of Dates with a day from two digits when DD is given', function () {
            assert.isBelow(lib.parse(["21/01/08"], ['YY/MM/DD'])[0].getDate(), 32)
        });

        it('sets an Array of Dates with a day when D is given', function () {
            assert.isBelow(lib.parse(["21/01/28"], ['YY/MM/D'])[0].getDate(), 32)
        });

        it('sets an Array of Dates with the hours from two digits when HH is given', function () {
            assert.isBelow(lib.parse(["21/8/28 01:44"], ['YY/M/DDTHH:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours when H is given', function () {
            assert.isBelow(lib.parse(["21/8/28 13:44"], ['YY/M/DDTH:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours from a 12 hours format in two digits when hh is given', function () {
            assert.isBelow(lib.parse(["21/8/28 12pm:44"], ['YY/M/DDThh:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours from a 12 hours format when h is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44"], ['YY/M/DDThh:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the minutes from two digits when mm is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:04"], ['YY/M/DDThh:mm'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the minutes when m is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44"], ['YY/M/DDThh:m'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the seconds from two digits when ss is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:02"], ['YY/M/DDThh:m:ss'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the seconds when s is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:12"], ['YY/M/DDThh:m:s'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the milliseconds when sss is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:12:394"], ['YY/M/DDThh:m:s:sss'])[0].getMinutes(), 1000)
        });

    });

    describe('#config', function () {
        it('sets an Object with a Label for the language given', function () {
            lib.config('language', {
                'it': {
                    short_months: [ 'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
                    long_months: [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                    short_days: [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
                    long_days: [ 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
                }
            });
        });
        it('should get an error if an incomplete array of object is given', function () {
            assert.throws(() => lib.config('language', {'it': {}}), 'Variable Value does not contain all the required values.');
        });

    });
});