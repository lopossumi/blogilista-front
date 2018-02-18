import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

    const blog = {
        title: 'Component test title',
        author: 'Component test author',
        url: 'Component test url',
        likes: 995
      }
  
    let blogComponent
    beforeEach(() => {
        blogComponent = shallow(<SimpleBlog blog={blog} />)
    })
  
  it('renders title in header', () => {
    const contentDiv = blogComponent.find('.blogHeader')
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders author in header', () => {
    const contentDiv = blogComponent.find('.blogHeader')
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes correctly in details', () => {
    const contentDiv = blogComponent.find('.blogDetails')
    expect(contentDiv.text()).toContain(blog.likes)
  })
})
