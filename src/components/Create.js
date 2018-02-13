import React from 'react'
class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    clear = () => {
        this.setState({
            title: '',
            author: '',
            url: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const title = this.state.title
        const author = this.state.author
        const url = this.state.url

        //this.clear()

        this.props.blogCreator({
            title: title,
            author: author,
            url: url
        })
    }

    render() {
        return (
            <div>
                <h3>create new</h3>
                <form id='blogCreateForm' onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr><td>title</td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleFieldChange}
                                />
                            </td></tr>
                        <tr><td>author</td>
                            <td>
                                <input
                                    type="text"
                                    name="author"
                                    value={this.state.author}
                                    onChange={this.handleFieldChange}
                                /></td></tr>
                        <tr><td>url</td>
                            <td>
                                <input
                                    type="text"
                                    name="url"
                                    value={this.state.url}
                                    onChange={this.handleFieldChange} 
                                    /></td></tr>
                        <tr><td><button type="submit">create</button></td><td></td></tr>
                    </tbody>
                </table>
                </form>
            </div>
        )
    }
}

export default Create