const join = (list1, key1, list2, key2) => {

  var obj_list2 = {}
  const result = []

  for (let obj2 of list2) {
    obj_list2[obj2[key2]] = obj2
  }

  console.log(obj_list2);

  for (let obj1 of list1) {
    result.push({
      ...obj1, ...obj_list2[obj1[key1]]
    })
  }
  return result
}

export { join }
