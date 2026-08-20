
const constructUserResponse = (user) => {
    const { name, email, createdAt, updatedAt } = user || {}
    return {
        name, email, createdAt, updatedAt
    }

}

module.exports = { constructUserResponse }