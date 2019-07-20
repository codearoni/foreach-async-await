
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

    it('Should return correctly on standard lexical function', async () => {

        const mult = 10;

        const fnReturn = await asyncForEach([1,2,3,4], (num) => {
            return num * mult;
        });        

        expect(fnReturn).to.include.ordered.members([1 * mult, 2 * mult, 3 * mult, 4 * mult]);
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

    it('Should provide the correct index for each iteration', async () => {

        const strArr = ['a', 's', 'd', 'f'];

        await asyncForEach(strArr, async (str, i) => {
            expect(str).to.equal(strArr[i]);
        });
    });

    it('Should provide the array for each iteration', async () => {
    
        const strArr = ['a', 's', 'd', 'f'];

        await asyncForEach(strArr, async (str, i, array) => {
            expect(str).to.equal(strArr[i]);
            expect(str).to.equal(array[i]);
            expect(array.length).to.equal(strArr.length);
        });
    });
});