// example for Testing properties and custom events in vue.js components with jest
import { mount } from '@vue/test-utils'
import Message from '@/components/Message'

describe('Message.test.js', () => {
    let cmp
    // create a helper factory function to create a message component, give some properties
    const createCmp = propsData => mount(Message, { propsData })
    // We group test cases within a describe expression, and they can be nested. 
    // So we can use this strategy to group the tests for properties and events separately.
    // Properties Testing
    describe('Properties', () => {      
        // Message.vue component has a message property, so let’s assert that it receives correctly that property. 
        // vue-test-utils comes with a hasProp(prop, value) function. 
        // hasProp() has been deprecated and will be removed in version 1.0.0. Use props()
        it('has a message property', () => {
            cmp = createCmp({ message: 'hey' })
            // expect(cmp.hasProp('message', 'hey')).toBeTruthy()
            expect(cmp.props('message', 'hey')).toBeTruthy()
        })

        // if we pass a property that is not defined, it won’t be received.
        it('has no cat property', () => {
            cmp = createCmp({ cat: 'hey' })
            // expect(cmp.hasProp('cat', 'hey')).toBeFalsy()
            expect(cmp.props('cat', 'hey')).toBeFalsy()
        })

        // We can test the default value as well. Go to Message.vue and change the props as follows:
        it('Paco is the default author', () => {
            cmp = createCmp({ message: 'hey' })
            expect(cmp.props('author', 'Paco')).toBeTruthy()
        })

        it('has the expected html structure', () => {
            expect(cmp.element).toMatchSnapshot()  // Snapshot Testing with Jest
        })

        // By the date of writing, vue-test-utils doesn’t have any utility to test this. We could use jest.spyOn to test it
        it('message is of type string', () => {
            let spy = jest.spyOn(console, 'error')
            cmp = createCmp({ message: 1 })
            expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop'))
          
            spy.mockReset() // or mockRestore() to completely remove the mock
        })

        describe('Validation', () => {
            const message = createCmp().vm.$options.props.message
      
            it('message is of type string', () => {
              expect(message.type).toBe(String)
            })
      
            it('message is required', () => {
              expect(message.required).toBeTruthy()
            })
      
            it('message has at least length 2', () => {
              expect(message.validator && message.validator('a')).toBeFalsy()
              expect(message.validator && message.validator('aa')).toBeTruthy()
            })
        })
          
    })

    // Event Testing
    describe('Events', () => {
        // @TODO
        beforeEach(() => {
          cmp = createCmp({ message: 'Cat' })
        })
        it('calls handleClick when click on message', () => {
            const stub = jest.fn()
            cmp.setMethods({ handleClick: stub })
          
            const el = cmp.find('.message').trigger('click')
            expect(stub).toBeCalled()
        })  

        // Testing the Custom Event message-clicked is emitted
        // use a Jest Mock function in combination with the Vue vm $on method:
        it('triggers a message-clicked event when a handleClick method is called', () => {
            const stub = jest.fn()
            cmp.vm.$on('message-clicked', stub)
            cmp.vm.handleClick()
            
            // using toBeCalledWith so we can assert exactly which parameters we expect
            expect(stub).toBeCalledWith('Cat')
        })


        // // using spyOn function:
        // it('calls handleClick when click on message', () => {
        //     const spy = spyOn(cmp.vm, 'handleClick')
        //     cmp.update() // Forces to re-render, applying changes on template
        //     // See the cmp.update()? When we change things that are used in the template, handleClick in this case, and we want the template to apply the changes, we need to use the update function.
          
        //     const el = cmp.find('.message').trigger('click')
        //     expect(cmp.vm.handleClick).toBeCalled()
        // })

        // // use a Jest Mock function:
        // it('calls handleClick when click on message', () => {
        //     cmp.vm.handleClick = jest.fn()
        //     cmp.update()
          
        //     const el = cmp.find('.message').trigger('click')
        //     expect(cmp.vm.handleClick).toBeCalled()
        // })

        // Using setMethods is the suggested way to do 
     
    })
})