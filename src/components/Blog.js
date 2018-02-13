import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })
    console.log('click')
  }

  render() {
    return (
      <div className='blogItem'>
        <div className='blogHeader' onClick={this.toggleDetails}>
          {this.props.blog.title} ({this.props.blog.author})</div>
        {this.state.showDetails &&
          <div className='blogDetails'>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            {this.props.blog.likes} like(s) <button style={{ zIndex: 999 }}>vote</button><br />
            {this.props.blog.user && `added by ${this.props.blog.user.name}`}
          </div>}

      </div>
    )
  }
}

export default Blog