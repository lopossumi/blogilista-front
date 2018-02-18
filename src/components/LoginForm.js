import PropTypes from 'prop-types'
import React from 'react'
const LoginForm = ({username, password, fieldHandler, loginHandler}) => (
  <div>
    <h2>Log in</h2>

    <form onSubmit={loginHandler}>
    <table>
      <tbody>
        <tr>
          <td>username</td>
          <td><input
          type="text"
          name="username"
          value={username}
          onChange={fieldHandler}
        /></td>
        </tr>
        <tr>
          <td>password</td>
          <td>
          <input
          type="password"
          name="password"
          value={password}
          onChange={fieldHandler}
        /></td>
        </tr>
        <tr>
          <td><button type="submit">login</button></td>
          </tr>
        </tbody>
      </table>
      
    </form>
  </div>
)

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  fieldHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm