 import MessageList from '@/components/MessageList'
// import MessageList from '@/components/MessageList'
// To test MessageList with Deep Rendering, we just need to use mount instead of shallowMount in the previously created test/MessageList.test.js:
// import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import Message from '@/components/Message'

// Testing Slots

describe('MessageLIst.test.js', () => {
    let cmp

    
    // Test unamed slot is called the default slot with more specific
    beforeEach(() => {
        const messageWrapper = {
            render(h) {
                return h(Message, { props: { message: 'hey y' } })
            }
        }
        cmp = mount(MessageList, {
            slots: {
                default: messageWrapper
            }
        })
    })

    it('Messages are inserted in a ul.list-messages element', () => {
        const list = cmp.find('ul.list-messages')
        expect(list.find(Message).isVueInstance()).toBe(true)
    })

    // Test named slot with a default value 
    it('Header slot renders a default header test', () => {
        const header = cmp.find('.list-header')
        expect(header.text().trim()).toBe('This is a default header')
    })

    //Test named slot but checking the default content gets replaced when we mock the header slot:
    it('Header slot is rendered withing .list-header', () => {
        const component = mount(MessageList, {
            slots: {
                header: '<div>What an awesome header</div>'
            }
        })
        const header = component.find('.list-header')
        expect(header.text().trim()).toBe('What an awesome header')
    })

    // Testing Contextual Slot Specs
    it('Message length is higher than or equal to 5', () => {
        const messages = cmp.findAll(Message)
        messages.wrappers.forEach(c => {
          expect(c.vm.message.length).toBeGreaterThanOrEqual(5)
        })
    })

    // Test unamed slot is called the default slot
    // beforeEach(() => {
    //     cmp = mount(MessageList, {
    //         slots: {
    //             default: '<div class="fake-msg"></div>'
    //         }

    //     })       
    // })

    // it('Messages are inserted in a ul.list-messages element', () => {
    //     const list = cmp.find('ul.list-messages')
    //     expect(list.findAll('.fake-msg').length).toBe(1)
    // })
})






// To test MessageList with Deep Rendering
// describe('MessageList.test.js', () => {
//     let cmp

//     beforeEach(() => { //  have you realized about the beforeEach thing? That’s a very clean way to create a clean component before each test, which is very important in unit testing, since it defines that test shouldn’t depend on each other.
//         cmp = mount(MessageList, {
//             // Be aware that props is overridden using `propsData`
//             propsData: {
//                 messages: ['Cat']
//             }
//         })
//     })

//     it('has received ["Cat"] as the message property', () => {
//         expect(cmp.vm.messages).toEqual(['Cat'])
//     })

//     it('is a MessageList component', () => {
//         // is to assert the root component type
//         expect(cmp.is(MessageList)).toBe(true) 

//         //Or with CSS selector
//         expect(cmp.is('ul')).toBe(true)
//     })

//     it('contains a Message component', () => {
//         // contains to check for sub-components existence. Just as find they receive a selecot, which can be a CSS selector or a Component.
//         expect(cmp.contains(Message)).toBe(true)

//         //Or with CC selector
//         expect(cmp.contains('.message')).toBe(true)
//     })

//     // We have some utils to assert the Vue instance:
//     it('Both MessageList and Message are vue instances', () => {
//         expect(cmp.isVueInstance()).toBe(true)
//         expect(cmp.find(Message).isVueInstance()).toBe(true)
//         expect(cmp.find(MessageList).isVueInstance()).toBe(true)
//     })

//     // we’re going to assert Structure in more detail:
//     it('Message element exists', () => {
//         expect(cmp.find('.message').exists()).toBe(true)
//       })

//     it('Message is not empty', () => {
//     expect(cmp.find(Message).isEmpty()).toBe(false)
//     })

//     it('Message has a class attribute set to "message"', () => {
//     expect(cmp.find(Message).attributes().class).toBe('message')
//     })

//     // we have classes and attributes().style to assert Styling
//     it('Message component has the .message class', () => {
//         expect(cmp.find(Message).classes()).toContain('message')
//     })

//     it('Message component has style margin-top: 10', () => {
//         expect(cmp.find(Message).attributes().style).toBe('margin-top: 10px;')
//     })

//     it('has the expected html structure', () => {
//         expect(cmp.element).toMatchSnapshot()  // Snapshot Testing with Jest
//     })

//     // Testing the @message-clicked triggers an event
//     it('Calls handleMessageClick when @message-click happens', () => {
//         const stub = jest.fn()
//         cmp.setMethods({ handleMessageClick: stub })
//         // cmp.update() //update has been removed from vue-test-utils. All updates are now synchronous by default


//         const el = cmp.find(Message).vm.$emit('message-clicked', 'cat')
//         expect(stub).toBeCalledWith('cat')
//     })
// })



// use shallowMount
// describe('MessageList.test.js', () => {
//     let cmp

//     beforeEach(() => {
//       cmp = shallowMount(MessageList, {
//         // Beaware that props is overriden using `propsData`
//         propsData: {
//           messages: ['Cat']
//         }
//       })
//     })

//     it('has received ["Cat"] as the message property', () => {
//       expect(cmp.vm.messages).toEqual(['Cat'])
//     })
//     it('contains 1 li element, with', () => {
//         expect(cmp.findAll('li').length).toBe(1)
//         expect(cmp.findAll('li').at(0).text()).toMatch('Cat')
//     })
//     it('has the expected html structure', () => {
//       expect(cmp.element).toMatchSnapshot()
//     })
// })



// path.resolve(__dirname, './es6'), 
//, resolve('node_modules/webpack-dev-server/client')

//  context: path.resolve(__dirname, '../'),

// loaders: [
//     {
//       test: path.join(__dirname, 'es6'),
//       loader: 'babel-loader',
//       query: {
//         presets: ['es2015']
//       }
//     }
//   ],


// path.join(__dirname, '..', 'src')

// node: {
//     // prevent webpack from injecting useless setImmediate polyfill because Vue
//     // source contains it (although only uses it if it's native).
//     setImmediate: false,
//     // prevent webpack from injecting mocks to Node native modules
//     // that does not make sense for the client
//     dgram: 'empty',
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty',
//     child_process: 'empty'
//   }

//       "@/([^\\.]*)$": "<rootDir>/src/$1",    

// "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",