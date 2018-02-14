import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      message: null
    }
  }

  componentDidMount() {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)

      this.getBlogs()
    }
  }

  getBlogs() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
      this.showMessage(`Welcome back, ${user.name}!`, 'info')
      this.getBlogs()

    } catch (exception) {
      this.showMessage('Invalid username or password.', 'error')
    }
  }

  logout = (event) => {
    window.localStorage.clear()
    this.setState({ user: null })
    this.showMessage('Logged out.', 'info')
  }

  addBlog = (blog) => {
    blogService
      .create(blog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog)
        })
        this.showMessage(`a new blog '${blog.title}' by ${blog.author} added.`, 'info')
        this.createForm.clear()
        this.createToggle.toggleVisibility()
      })
      .catch(error => {
        console.log(error)
      })
  }

  vote = async (event) => {
    const votedId = event.target.value
    const blog = this.state.blogs.find(blog => blog._id === votedId)
    const updatedBlog = await blogService.vote(blog)

    const newBlogs = this.state.blogs.map(blog => blog._id === votedId ? updatedBlog : blog)
    
    this.setState({blogs:newBlogs})
    this.showMessage(`you liked ${blog.title} by ${blog.author}`, 'info')
  }

  showMessage = (message, msgType) => {
    this.setState({
      message: message,
      msgType: msgType
    })
    setTimeout(() => {
      this.setState({
        message: null,
        msgType: null
      })
    }, 3000)
  }

  render() {

    return (
      <div>

        <Notification
          message={this.state.message}
          msgType={this.state.msgType} />

        <h1>X combinateur blogs</h1>

        {!this.state.user &&
          <LoginForm 
            username={this.state.username}
            password={this.state.password}
            fieldHandler={this.handleLoginFieldChange}
            loginHandler={this.login}/>
        }

        {this.state.user && (
          <div>
            <p>Logged in as {this.state.user.name} <button onClick={this.logout}>sign out</button></p>

            <Togglable
              buttonLabel="create new..."
              ref={component => this.createToggle = component}>
              <CreateForm
                blogCreator={this.addBlog}
                ref={component => this.createForm = component} />
            </Togglable>

            <h2>List of blogs</h2>
            {this.state.blogs.map(blog =>
              <Blog 
                key={blog._id}
                blog={blog}
                voteHandler={this.vote}/>)}
          </div>
        )}
      </div>
    );
  }
}

export default App;
