import React from 'react'
import Blog from './components/Blog'
import Create from './components/Create'
import Notification from './components/Notification'
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
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
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
      this.showMessage(`Welcome back, ${user.name}!`)
    } catch (exception) {
      this.showMessage('Invalid username or password.')
    }
  }

  logout = (event) => {
    window.localStorage.clear()
    this.setState({ user: null })
  }

  addBlog = (blog) => {
    blogService
      .create(blog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog)
        })
      })
  }

  showMessage = (text) => {
    this.setState({
        message: text
    })
    setTimeout(() => {
        this.setState({ message: null })
    }, 3000)
}

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    if (!this.state.user) {
      return loginForm()
    }

    return (
      <div>
        <h2>X combinateur blogs</h2>
        <Notification message={this.state.message} />
        {this.state.user &&
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            <Create blogCreator={this.addBlog} />
          </div>
        }
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    );
  }
}

export default App;
