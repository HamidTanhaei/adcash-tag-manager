var assert = require('assert');
import TagInput from '../source/TagInput';

describe('TagManager', function() {
    const TagInputClass = new TagInput([]);

    describe('isNumber', function() {
        it('Should return true when the value is a number', function() {
            assert(TagInputClass.isNumber(5));
        });
        it('Should return false when the value is not a number', function() {
            assert(!TagInputClass.isNumber('adcash'));
        });
    });

    describe('dataNormalizer', function() {
        it('Should throw an error when value is not set', function() {
            assert.throws(function () { TagInputClass.dataNormalizer() }, /Input is not valid/);
        });
        it('Should return array by separating with comma, semicolon or line break', function() {
            assert(Array.isArray(TagInputClass.dataNormalizer("5,adcash\rhello")));
        });
        it('Should return empty array when there is no number', function() {
            assert.equal(TagInputClass.dataNormalizer("Hello;adcash").length, 0);
        });
        it('Should return array of numbers by entering non numeric and numeric inputs together', function() {
            assert((()=>{
                const retArray = TagInputClass.dataNormalizer("5,-1,hello;adcash");
                if(retArray.length !== 2) return false;
                if(retArray[0] !== '5' || retArray[1] !== '-1') return false;
                return true;
            })());
        });
    });

    describe('mergeArrayDouplicatePreventer', function() {
        it('Should throw error on calling without passing parameters', function() {
            assert.throws(function () { TagInputClass.mergeArrayDouplicatePreventer() }, /Inputs are not valid/);
        });
        it('Should throw error when first parameter is not an array', function() {
            assert.throws(function () { TagInputClass.mergeArrayDouplicatePreventer('adcash',[1,2,3]) }, /First input expected to be an array/);
        });
        it('Should throw error when second parameter is an array', function() {
            assert.throws(function () { TagInputClass.mergeArrayDouplicatePreventer([1,2,3], 'adcash') }, /Second input expected to be an array/);
        });
        it('Should merge arrays without duplicate values', function() {
            assert((()=>{
                const retArray = TagInputClass.mergeArrayDouplicatePreventer([1,2,3],[3,4,5]);
                if(retArray.length !== 5) return false;
                let checkArray = [];
                for(let i = 0 ; i < retArray.length ; i++){
                    if(!checkArray[i])
                        checkArray[i] = retArray[i];
                    else
                        return false;
                }
                return true;
            })());
        });
    });

    describe('remove', function() {
        it('Should remove an element from tags list', function() {
            TagInputClass.items([1,2,3]);
            TagInputClass.remove(1);
            assert.equal(TagInputClass.items().length, 2);
        });
        it('Should remove passed element', function() {
            TagInputClass.items([1,2,3]);
            TagInputClass.remove(1);
            assert.equal(TagInputClass.items()[0], 2);
        });
    });
});