let tasks = []

let myObj = {
    id: 10,
    text: "hello dude",
    done: false
}

tasks.push(myObj)

tasks = tasks.filter((t) => {
    return t.id == 11
}) 

console.log(tasks)