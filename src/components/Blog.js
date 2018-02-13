import React from 'react'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user,
      showDetails: false
    }
  }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div
        style={blogStyle}
        onClick={this.toggleDetails}>

        {this.state.title} ({this.state.author})
        
        {this.state.showDetails &&
          <div style={{marginLeft:'10px'}}>
            <a href={this.state.url}>{this.state.url}</a><br />
            {this.state.likes} like(s)<br/>
            {this.state.user && `added by ${this.state.user.name}`}
        </div>}

      </div>
    )
  }
}

export default Blog