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
  }

  render() {
    return (
      <div className='blogItem'>
        <div className='blogHeader' onClick={this.toggleDetails}>
          {this.props.blog.title} ({this.props.blog.author})</div>
        {this.state.showDetails &&
          <div className='blogDetails'>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            {this.props.blog.likes} {this.props.blog.likes === 1 ? 'like' : 'likes'} <button value={this.props.blog._id} onClick={this.props.voteHandler}>vote</button><br />
            {this.props.blog.user && `added by ${this.props.blog.user.name}`}
            {(!this.props.blog.user || (this.props.blog.user.username === this.props.myUserName)) && <button value={this.props.blog._id} onClick={this.props.removeHandler}>remove</button>}
          </div>}

      </div>
    )
  }
}

export default Blog