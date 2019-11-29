
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(user => {
        if (user[objPropName] === itemId) {
            return {...user, ...newObjProps}
        }
        return user
    })
};

export const incrementId = array => {
    return array.slice(-1)[0]["id"] + 1;

};