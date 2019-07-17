
'use strict';

const expect = require('chai').expect;

const asyncForEach = require('../index');

describe('asyncForEach', () => {

    it('Should throw an error when there is no array', async () => {

        let err = null;

        try {
            await asyncForEach(null, async () => {

            });
        } catch (e) {
            err = e;
        }

        expect(err).to.be.an('error');
    });

    it('Should throw an error when there is no callback', async () => {

        let err = null;

        try {
            await asyncForEach([1,2,3,4]);
        } catch (e) {
            err = e;
        }

        expect(err).to.be.an('error');
    });

    it('Should multiply all values by 2', async () => {

        const numArr = [2,4,6,8];
        const mult = 2;
        const expectedArr = [];

        numArr.forEach((num) => {
            expectedArr.push(mult * num);
        });

        const multipliedNums = await asyncForEach(numArr, async (num) => {
            return new Promise((resolve) => {
                resolve(mult * num);
            });
        });

        expect(multipliedNums.length).to.equal(numArr.length);
        expect(expectedArr).to.include.ordered.members(multipliedNums);
    });
});