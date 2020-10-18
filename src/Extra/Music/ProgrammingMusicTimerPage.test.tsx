'use strict';

import React from 'react';
import {mount} from 'enzyme';
import ProgrammingMusicTimerPage from "./ProgrammingMusicTimerPage";

describe('<Pomodoro /> tests of default settings', () => {
    var component;

    beforeEach(() => {
        component = mount(<ProgrammingMusicTimerPage/>);
    });

    it('verify the default state are correctly', () => {
        expect(component.node.state.play).toBeFalsy()
        expect(component.node.state.time).toBe(1500);
        expect(component.node.state.time).toBe(1500)
        expect(component.node.state.timeType).toBe(1500)
        expect(component.node.state.title).toBe('25:00 | Pomodoro timer')
    });

    // it('the options of notification should be unchecked', () => {
    //     assert.isFalse(component.node.refs.audio.checked);
    //     assert.isFalse(component.node.refs.vibrate.checked);
    //     assert.isFalse(component.node.refs.notification.checked);
    // });
    //
    // it('should be two buttons to control the play and pause', () => {
    //     let buttons = component.find('div.pomodoro div.controlsPlay button');
    //
    //     expect(buttons.length).toBe(2)
    //
    //     let playButton = buttons.find('.play').node,
    //         stopButton = buttons.find('.stop').node;
    //
    //     assert.isDefined(playButton);
    //     assert.isDefined(stopButton);
    // });
    //
    // it('should be three buttons to change pomodoro type', () => {
    //     let buttons = component.find('div.pomodoro div.main div.types button');
    //
    //     expect(buttons.length).toBe(3)
    //
    //     let codeButton = buttons.find('.code').node,
    //         socialButton = buttons.find('.social').node,
    //         coffeeButton = buttons.find('.coffee').node;
    //
    //     assert.isDefined(codeButton);
    //     assert.isDefined(socialButton);
    //     assert.isDefined(coffeeButton);
    //
    //     expect(codeButton.innerHTML).toBe('Code')
    //     expect(socialButton.innerHTML).toBe('Social')
    //     expect(coffeeButton.innerHTML).toBe('Coffee')
    // });
});

// describe('<Pomodoro /> tests behavior of buttons', () => {
//     var component;
//
//     beforeEach(() => {
//         component = mount(<Pomodoro/>);
//     });
//
//     it('when click on play the state should be changed', () => {
//         let playButton = component.find('div.pomodoro div.controlsPlay button.play');
//
//         assert.isFalse(component.node.state.play);
//         playButton.simulate('click');
//         assert.isTrue(component.node.state.play);
//     });
//
//     it('when click on social type the states should be changed', () => {
//         let socialButton = component.find('div.pomodoro div.types button.social');
//
//         socialButton.simulate('click');
//
//         assert.isTrue(component.node.state.play);
//         expect(component.node.state.time).toBe(300)
//         expect(component.node.state.timeType).toBe(300)
//         expect(component.node.state.title).toBe('05:00 | Pomodoro timer')
//     });
//
//     it('when click on coffee type the states should be changed', () => {
//         let coffeeButton = component.find('div.pomodoro div.types button.coffee');
//
//         coffeeButton.simulate('click');
//
//         assert.isTrue(component.node.state.play);
//         expect(component.node.state.time).toBe(900)
//         expect(component.node.state.timeType).toBe(900)
//         expect(component.node.state.title).toBe('15:00 | Pomodoro timer')
//     });
// });

// describe('<Pomodoro /> check if items on localStorage should be exists', () => {
//     var component;
//
//     beforeEach(() => {
//         component = mount(<Pomodoro/>);
//     });
//
//     afterEach(() => {
//         localStorage.clear();
//     });
//
//     it('after checked the notification input', () => {
//         let notificationInput = component.find('div.pomodoro div.controlsCheck #notification');
//
//         let item = 'react-pomodoro-notification';
//
//         assert.isUndefined(localStorage.getItem(item));
//         notificationInput.simulate('change', {target: {checked: true}});
//         expect(localStorage.getItem(item)).toBe('true')
//     });
//
//     it('after checked the audio input', () => {
//         let audioInput = component.find('div.pomodoro div.controlsCheck #audio');
//
//         let item = 'react-pomodoro-audio';
//
//         assert.isUndefined(localStorage.getItem(item));
//         audioInput.simulate('change', {target: {checked: true}});
//         expect(localStorage.getItem(item)).toBe('true')
//     });
//
//     it('after checked the vibrate input', () => {
//         let audioInput = component.find('div.pomodoro div.controlsCheck #vibrate');
//
//         let item = 'react-pomodoro-vibrate';
//
//         assert.isUndefined(localStorage.getItem(item));
//         audioInput.simulate('change', {target: {checked: true}});
//         expect(localStorage.getItem(item)).toBe('true')
//     });
// });