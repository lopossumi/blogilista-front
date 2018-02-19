import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

    const mockHandler = jest.fn()

    const blog = {
        title: 'Component test title',
        author: 'Component test author',
        url: 'Component test url',
        likes: 995
      }
  
    let blogComponent
    beforeEach(() => {
        blogComponent = shallow(
        <Blog 
            blog={blog} 
            onClick={mockHandler}
            />)
    })
  
  it('renders title in header', () => {
    const contentDiv = blogComponent.find('.blogHeader')
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders author in header', () => {
    const contentDiv = blogComponent.find('.blogHeader')
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('does not show details before click', () => {
    const contentDiv = blogComponent.find('.blogDetails')
    expect(contentDiv===undefined)
  })

  it('details are shown after clicking header', () => {
    const header = blogComponent.find('.blogHeader')
    header.simulate('click')
    const contentDiv = blogComponent.find('.blogDetails')
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.url)
  })
})
