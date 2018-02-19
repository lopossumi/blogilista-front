import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {

        beforeEach(() => {
            app = mount(<App />)
        })

        it('shows login form', () => {
            app.update()
            const contentDiv = app.find('.loginFormTable')
            console.log(contentDiv.debug())
            expect(contentDiv.length).toBe(1)
        })

        it('does not show any blogs', () => {
            app.update()
            const contentDiv = app.find('.blogHeader')
            console.log(contentDiv.debug())
            expect(contentDiv.length).toBe(0)
        })

    })

    describe('when user is logged in', () => {

        beforeEach(() => {
            const user = {
                username: 'teppotesti',
                token: 'anyoldtokenwilldo',
                name: 'Teppo Testi'
              }
              localStorage.setItem('loggedBlogappUser', JSON.stringify(user))              
              app = mount(<App />)
            })

        it('does not show login form', () => {
            app.update()
            const contentDiv = app.find('.loginFormTable')
            console.log(contentDiv.debug())
            expect(contentDiv.length).toBe(0)
        })

        it('shows blogs', () => {
            app.update()
            const contentDiv = app.find('.blogHeader')
            console.log(contentDiv.debug())
            expect(contentDiv.length).toBeGreaterThan(0)
        })

    })

})
