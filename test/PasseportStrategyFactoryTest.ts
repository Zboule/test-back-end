
/**
 * @file	Test for PasseportStrategyFactory
 * @author	Jordane CURÉ
 */

import { assert } from 'chai'

import * as PassportJWT from 'passport-jwt'
// tslint:disable-next-line:no-duplicate-imports
import { Strategy, StrategyOptions } from 'passport-jwt'
import * as sinon from 'sinon'
import { passeportStrategyFactory } from '../src/config/PasseportStrategyFactory'


describe('PasseportStrategyFactory', () => {

    it('Should be initialized', () => {
        assert.isObject(passeportStrategyFactory, 'foo is neither `null` nor `undefined`')
    })

    describe('getJWTStrategy()', () => {

        let jWTStrategy
        let spy

        before(() => {
            spy = sinon.spy(PassportJWT, 'Strategy')
            jWTStrategy = passeportStrategyFactory.getJWTStrategy()
        })

        it('should construct a JWT Strategy instance', () => {
            assert(spy.calledWithNew, 'Instance wasn\'t created')
            assert.exists(spy.args[0][0], 'Param 1 is required')
        })


        it('should create a JWT Strategy with a strong secretOrKey', () => {

            const strategyOptions = spy.args[0][0]
            assert.property(strategyOptions, 'secretOrKey', 'La strategy doit avoir une secretOrKey')

            const secretOrKey = strategyOptions.secretOrKey
            assert.isAbove(secretOrKey.length, 10, 'La force de la secretOrKey est insufisante')
        })

        it('should return an object (i.e. the strategy)', () => {
            assert.exists(jWTStrategy, 'La strategy doit avoir une secretOrKey')
        })

        // it('Should create a new Strategy with params', () => {
        //     const spy = sinon.spy(PassportJWT, 'Strategy')

        //     const jWTStrategy = passeportStrategyFactory.getJWTStrategy()

        //     assert(spy.calledWithNew)

        //     const callArgs = spy.args[0]
        //     // Should check the secretOrKeyComplexity
        //     assert.property(callArgs[0], 'secretOrKey', 'Le param doit avoir une secret key')

        //     // Should valide the StrategyOption
        //     // assert(jWTStrategy instanceof StrategyOptions)
        // })


    })

})
