let token = null

const blogs = [
    {
    likes: 20,
    _id: "5a843277efa4f7a78b395e8c",
    title: "Foo",
    author: "Bar",
    url: "Baz",
    user: {
    _id: "5a843160eedee43d78d66452",
    username: "teppotesti",
    name: "Teppo Testi"
    },
    __v: 0
    }
    ]
const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }