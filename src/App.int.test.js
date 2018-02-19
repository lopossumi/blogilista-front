import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    const mockHandler = jest.fn()

    let app
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
