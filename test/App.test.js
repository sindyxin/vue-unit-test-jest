import { shallowMount } from '@vue/test-utils'
// import App from '../src/App'
import App from '@/App'

describe('App.test.js', () => {
    let cmp

    beforeEach(() => {
        cmp = shallowMount(App)
        cmp.setData({ messages: ['Cat'] })
    })

    it('equals messages to ["Cat"]', () => {
        // Within cmp.vm, we can access all Vue instance methods
        expect(cmp.vm.messages).toEqual(['Cat'])
    })

    it('has the expected html structure', () => {
        expect(cmp.element).toMatchSnapshot()
    })
})

/**
 * Without vue-test-utils
 */
// import Vue from 'vue'
// import App from '../src/App'

// describe('App.test.js', () => {
//   let cmp, vm

//   beforeEach(() => {
//     cmp = Vue.extend(App)
//     vm = new cmp({
//       data: {
//         messages: ['Cat']
//       }
//     }).$mount()
//   })

//   it('equals messages to ["Cat"]', () => {
//     expect(vm.messages).toEqual(['Cat'])
//   })

//   it('has the expected html structure', () => {
//     expect(vm.$el).toMatchSnapshot()
//   })
// })


//     "webpack": "^4.19.1",
// "webpack-bundle-analyzer": "^3.0.2",
// "webpack-cli": "^3.1.0",
// "webpack-dev-server": "^2.9.7",
// "webpack-merge": "^4.1.0"
// "extract-text-webpack-plugin": "^3.0.0",