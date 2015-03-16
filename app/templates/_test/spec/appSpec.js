/*global define, describe, it */

define([], function(){
    'use strict';

    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should pass', function () {
                var a = 1;
                var b = 1;
                a.should.equal(b);
            });
        });
    });

    describe('Give it some context again', function () {
        describe('maybe a bit more context here', function () {
            it('should not fail', function () {
                var a = 2;
                var b = 2;
                a.should.equal(b);
            });
        });
    });
});
